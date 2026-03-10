import { useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileMenu from "./ProfileMenu.jsx";

function Header({ darkMode, toggleDarkMode, isCollapsed }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const sidebarWidth = isCollapsed ? 72 : 240;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: sidebarWidth,
        right: 0,
        height: "64px",
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        color: darkMode ? "#e0e0e0" : "#1a1a1a",
        zIndex: 1100,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 20px",
        boxShadow: darkMode
          ? "0 2px 10px rgba(0,0,0,0.6)"
          : "0 2px 10px rgba(0,0,0,0.12)",
        transition: "left 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Botón dark mode */}
        <button
          onClick={toggleDarkMode}
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            fontSize: "1.5rem",
            padding: "8px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </button>

        {/* Perfil */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <AccountCircleIcon fontSize="large" />
          </button>

          {menuOpen && (
            <ProfileMenu
              onClose={() => setMenuOpen(false)}
              darkMode={darkMode}
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;