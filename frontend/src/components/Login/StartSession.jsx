import { useState } from "react";
import LoginForm from "./UserLogin/LoginSession";
import RegisterForm from "./UserLogin/RegisterSession";
import styles from "./styles/styles";

function StartSession() {
  const [mode, setMode] = useState("login");

  return (
    <div style={styles.overlay}>
      <aside style={styles.panel}>
        {/* Logo / Brand */}
        <div style={styles.brand}>
          <div style={styles.brandIcon}>⬡</div>
          <span style={styles.brandName}>MyApp</span>
        </div>

        {/* Tabs */}
        <div style={styles.tabBar}>
          <button
            style={mode === "login" ? styles.activeTab : styles.tab}
            onClick={() => setMode("login")}>
            Iniciar sesión
          </button>
          <button
            style={mode === "register" ? styles.activeTab : styles.tab}
            onClick={() => setMode("register")}>
            Registrarse
          </button>
        </div>

        {/* Title */}
        <h2 style={styles.title}>
          {mode === "login" ? "¡Bienvenido de nuevo!" : "Crea tu cuenta"}
        </h2>
        <p style={styles.subtitle}>
          {mode === "login"
            ? "Ingresa tus credenciales para continuar."
            : "Completa el formulario para empezar."}
        </p>

        {/* Forms — key fuerza re-mount al cambiar de modo */}
        {mode === "login" ? (
          <LoginForm key="login" />
        ) : (
          <RegisterForm key="register" />
        )}

        {/* Footer */}
        <p style={styles.footerText}>
          {mode === "login" ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
          <button
            style={styles.linkBtn}
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </aside>
    </div>
  );
}

export default StartSession;