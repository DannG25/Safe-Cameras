import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import BuildIcon from "@mui/icons-material/Build";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function Sidebar({ darkMode, isCollapsed, onToggle }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: "/", icon: <HomeIcon />, label: "Home" },
    { path: "/about", icon: <InfoIcon />, label: "Acerca de" },
    { path: "/services", icon: <BuildIcon />, label: "Servicios" },
    { path: "/contact", icon: <ContactMailIcon />, label: "Contacto" },
  ];

  const sidebarWidth = isCollapsed ? 72 : 240;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: sidebarWidth,
        backgroundColor: darkMode ? "#1a1a1a" : "#f5f5f5",
        color: darkMode ? "#ffffff" : "#1a1a1a",
        transition: "width 0.3s ease",
        boxShadow: darkMode
          ? "4px 0 12px rgba(0,0,0,0.4)"
          : "4px 0 12px rgba(0,0,0,0.1)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "24px 16px",
          fontSize: isCollapsed ? 0 : "1.4rem",
          fontWeight: "bold",
          color: "#646cff",
          textAlign: "center",
          transition: "all 0.3s ease",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {isCollapsed ? "" : "Mi App"}
      </div>

      {/* Menú */}
      <nav style={{ flex: 1, padding: "16px 0" }}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "14px 20px",
              color: isActive(item.path)
                ? "#646cff"
                : darkMode
                ? "#e0e0e0"
                : "#333",
              textDecoration: "none",
              fontSize: "1.05rem",
              fontWeight: isActive(item.path) ? 600 : 400,
              backgroundColor: isActive(item.path)
                ? "rgba(100,108,255,0.12)"
                : "transparent",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                minWidth: 40,
                display: "flex",
                justifyContent: "center",
                fontSize: "1.6rem",
              }}
            >
              {item.icon}
            </div>

            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Botón colapsar */}
      <button
        onClick={onToggle}
        style={{
          background: "none",
          border: "none",
          color: darkMode ? "#aaa" : "#555",
          padding: "16px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          fontSize: "1.6rem",
        }}
      >
        {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>
    </div>
  );
}

export default Sidebar;