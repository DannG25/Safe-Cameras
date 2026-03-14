import { useState } from "react";
import { useForm } from "react-hook-form";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Register:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form} noValidate>
      <div style={styles.fieldGroup}>
        <input
          type="text"
          placeholder="Nombre"
          style={{
            ...styles.input,
            ...(errors.name ? styles.inputError : {}),
          }}
          {...register("name", {
            required: "El nombre es obligatorio",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
        />
        {errors.name && (
          <span style={styles.errorMsg}>{errors.name.message}</span>
        )}
      </div>

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

      <div style={styles.fieldGroup}>
        <input
          type="password"
          placeholder="Confirmar contraseña"
          style={{
            ...styles.input,
            ...(errors.confirmPassword ? styles.inputError : {}),
          }}
          {...register("confirmPassword", {
            required: "Confirma tu contraseña",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          })}
        />
        {errors.confirmPassword && (
          <span style={styles.errorMsg}>{errors.confirmPassword.message}</span>
        )}
      </div>

      <button type="submit" style={styles.button} disabled={isSubmitting}>
        {isSubmitting ? "Creando cuenta…" : "Crear cuenta"}
      </button>
    </form>
  );
}

export default RegisterForm;