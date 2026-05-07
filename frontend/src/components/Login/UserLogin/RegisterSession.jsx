// src/components/RegisterForm.jsx
import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "../styles/styles";

const API_URL = "http://localhost:8000/auth/register/";

// ── Helpers ──────────────────────────────────────────────
function FieldError({ message }) {
  if (!message) return null;
  return <span style={styles.errorMsg}>{message}</span>;
}

function ServerError({ message }) {
  if (!message) return null;
  return (
    <span style={{ ...styles.errorMsg, display: "block", marginTop: 4 }}>
      {message}
    </span>
  );
}

// ── Componente principal ──────────────────────────────────
function RegisterForm({ onSwitchToLogin }) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");
  const [showModal, setShowModal] = useState(false);
  const [globalError, setGlobalError] = useState("");

  // ── Submit ──────────────────────────────────────────────
  const onSubmit = async (data) => {
    setGlobalError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Mapear errores del servidor a campos individuales
        const FIELD_NAMES = ["name","username", "email", "phone", "password", "confirm_password"];
        let hasFieldError = false;

        for (const [key, value] of Object.entries(result)) {
          const msg = Array.isArray(value) ? value[0] : value;

          if (FIELD_NAMES.includes(key)) {
            setError(key, { type: "server", message: msg });
            hasFieldError = true;
          } else {
            setGlobalError(msg);  // Errores sin campo
          }
        }

        if (!hasFieldError && !globalError) {
          setGlobalError("Ocurrió un error. Intenta de nuevo.");
        }
        return;
      }

      // Guardar tokens y mostrar modal
      localStorage.setItem("access", result.tokens.access);
      localStorage.setItem("refresh", result.tokens.refresh);
      setShowModal(true);

    } catch {
      setGlobalError("Error de red. Verifica tu conexión.");
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    onSwitchToLogin?.();
  };

  // ── Render ──────────────────────────────────────────────
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form} noValidate>
        {/* Name */}
        <div style={styles.fieldGroup}>
          <input
            type="text"
            placeholder="Nombre completo"
            style={{ ...styles.input, ...(errors.name ? styles.inputError : {}) }}
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
          />
          <FieldError message={errors.name?.message} />
        </div>
        {/* Username */}
        <div style={styles.fieldGroup}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            style={{ ...styles.input, ...(errors.username ? styles.inputError : {}) }}
            {...register("username", {
              required: "El nombre es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
          />
          <FieldError message={errors.username?.message} />
        </div>

        {/* Email */}
        <div style={styles.fieldGroup}>
          <input
            type="email"
            placeholder="Correo electrónico"
            style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo inválido",
              },
            })}
          />
          <FieldError message={errors.email?.message} />
        </div>

        {/* Teléfono */}
        <div style={styles.fieldGroup}>
          <input
            type="tel"
            placeholder="Número de teléfono"
            style={{ ...styles.input, ...(errors.phone ? styles.inputError : {}) }}
            {...register("phone", {
              required: "El número de teléfono es obligatorio",
              pattern: {
                value: /^\d{10}$/,
                message: "Debe tener 10 dígitos",
              },
            })}
          />
          <FieldError message={errors.phone?.message} />
        </div>

        {/* Password */}
        <div style={styles.fieldGroup}>
          <input
            type="password"
            placeholder="Contraseña"
            autoComplete="new-password"
            style={{ ...styles.input, ...(errors.password ? styles.inputError : {}) }}
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
            })}
          />
          <FieldError message={errors.password?.message} />
        </div>

        {/* Confirm password */}
        <div style={styles.fieldGroup}>
          <input
            type="password"
            placeholder="Confirmar contraseña"
            autoComplete="new-password"
            style={{ ...styles.input, ...(errors.confirm_password ? styles.inputError : {}) }}
            {...register("confirm_password", {
              required: "Confirma tu contraseña",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />
          <FieldError message={errors.confirm_password?.message} />
        </div>

        {/* Error global del servidor */}
        <ServerError message={globalError} />

        <button type="submit" style={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Creando cuenta…" : "Crear cuenta"}
        </button>
      </form>

      {/* Modal de éxito */}
      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Cuenta creada</h3>
            <p>Tu cuenta fue creada correctamente.</p>
            <button style={styles.button} onClick={handleConfirm}>
              Ir a iniciar sesión
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterForm;