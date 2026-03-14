import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/styles";

// ── Sub-componente: Login ──────────────────────────────────────────────────────
function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form} noValidate>
      <div style={styles.fieldGroup}>
        <input
          type="email"
          placeholder="Correo electrónico"
          style={{
            ...styles.input,
            ...(errors.email ? styles.inputError : {}),
          }}
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Correo inválido",
            },
          })}
        />
        {errors.email && (
          <span style={styles.errorMsg}>{errors.email.message}</span>
        )}
      </div>

      <div style={styles.fieldGroup}>
        <input
          type="password"
          placeholder="Contraseña"
          style={{
            ...styles.input,
            ...(errors.password ? styles.inputError : {}),
          }}
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          })}
        />
        {errors.password && (
          <span style={styles.errorMsg}>{errors.password.message}</span>
        )}
      </div>

      <button type="submit" style={styles.button} disabled={isSubmitting}>
        {isSubmitting ? "Iniciando…" : "Iniciar sesión"}
      </button>
    </form>
  );
}

export default LoginForm;