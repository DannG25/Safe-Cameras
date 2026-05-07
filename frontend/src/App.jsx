import { useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";

export const ThemeContext = createContext(false);

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ThemeContext.Provider value={darkMode}>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Navbar
          darkMode={darkMode}
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />
        <Header
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          isCollapsed={isCollapsed}
        />
        <div
          style={{
            marginLeft: isCollapsed ? 72 : 240,
            width: "100%",
            paddingTop: "64px",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Outlet />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
