import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

function ProfileMenu({ onClose, darkMode }) {
  // Simulación – aquí iría la lógica real de logout
  const handleLogout = () => {
    console.log('Cerrando sesión...');
    // Ejemplo: localStorage.removeItem('token'); window.location.href = '/login';
    onClose();
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        right: 0,
        backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
        border: darkMode ? '1px solid #444' : '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: darkMode 
          ? '0 8px 24px rgba(0,0,0,0.5)' 
          : '0 8px 24px rgba(0,0,0,0.15)',
        minWidth: '180px',
        zIndex: 1200,
        overflow: 'hidden',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          padding: '12px 16px',
          borderBottom: darkMode ? '1px solid #333' : '1px solid #eee',
          fontSize: '0.9rem',
          color: darkMode ? '#aaa' : '#666',
        }}
      >
        dann@example.com
      </div>

      <Link
        to="/profile"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          color: darkMode ? '#e0e0e0' : '#1a1a1a',
          textDecoration: 'none',
          transition: 'background 0.15s',
        }}
        onClick={onClose}
      >
        <PersonIcon fontSize="small" />
        Ver perfil
      </Link>

      <button
        onClick={handleLogout}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          background: 'none',
          border: 'none',
          color: darkMode ? '#ff6b6b' : '#d32f2f',
          cursor: 'pointer',
          textAlign: 'left',
          fontSize: '1rem',
          transition: 'background 0.15s',
        }}
      >
        <LogoutIcon fontSize="small" />
        Cerrar sesión
      </button>
    </div>
  );
}

export default ProfileMenu;