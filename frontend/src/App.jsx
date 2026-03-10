import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx'
import Header from './components/Header.jsx';

// Modo oscuro / Modo claro
function App() {
  const [darkMode, setDarkMode] = useState(() => {

    // Leer preferencia guardada o del sistema
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: darkMode ? '#0d0d0d' : '#f5f5f5',
      color: darkMode ? '#e0e0e0' : '#1a1a1a',
      transition: 'background-color 0.3s, color 0.3s',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 16px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>

        <main style={{
          flex: 1,
          overflowY: 'auto',
        }}>
      <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}/>
      <Outlet/>

      <Navbar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        darkMode={darkMode}/>
        </main>
      </div>
    </div>
  );
}

export default App;