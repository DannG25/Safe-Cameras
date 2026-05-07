import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "../styles/styles";

const API_URL = "http://localhost:8000/auth/login/";

// ── Helpers ───────────────────────────────────────────────
function FieldError({ message }) {
  if (!message) return null;
  return <span style={styles.errorMsg}>{message}</span>;
}

function GlobalError({ message }) {
  if (!message) return null;
  return (
    <div style={{
      ...styles.errorMsg,
      display: "block",
      padding: "8px 12px",
      borderRadius: 6,
      marginBottom: 12,
      background: "rgba(220,38,38,0.07)",
      border: "0.5px solid rgba(220,38,38,0.25)",
    }}>
      {message}
    </div>
  );
}

// ── Componente principal ──────────────────────────────────
function LoginForm({ onLoginSuccess }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [globalError, setGlobalError] = useState("");

  // ── Submit ────────────────────────────────────────────
  const onSubmit = async (data) => {
    setGlobalError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Manejar códigos de error del backend
      if (!response.ok) {
        const msg =
          result?.error ||
          result?.detail ||
          "Error al iniciar sesión. Intenta de nuevo.";

        setGlobalError(msg);
        return;
      }

      //  Persistir sesión
      localStorage.setItem("access", result.tokens.access);
      localStorage.setItem("refresh", result.tokens.refresh);
      localStorage.setItem("user", JSON.stringify(result.user));

      navigate("/home", { replace: true });
      
      // ✅ Notificar al componente padre (ej: redirigir al dashboard)
      onLoginSuccess?.(result.user);

    } catch {
      setGlobalError("Error de red. Verifica tu conexión.");
    }
  };

  // ── Render ────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form} noValidate>

      {/* Error global (401, 403, red) */}
      <GlobalError message={globalError} />

      {/* Email */}
      <div style={styles.fieldGroup}>
        <input
          type="email"
          placeholder="Correo electrónico"
          autoComplete="email"
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

      {/* Password */}
      <div style={styles.fieldGroup}>
        <input
          type="password"
          placeholder="Contraseña"
          autoComplete="current-password"
          style={{ ...styles.input, ...(errors.password ? styles.inputError : {}) }}
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          })}
        />
        <FieldError message={errors.password?.message} />
      </div>

      <button type="submit" style={styles.button} disabled={isSubmitting}>
        {isSubmitting ? "Iniciando…" : "Iniciar sesión"}
      </button>

    </form>
  );
}

export default LoginForm;