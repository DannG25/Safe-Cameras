// src/pages/Dashboard.jsx  (o Home.jsx)
import CameraScanner from "../components/CameraScanner"
import CameraList from "../components/CameraList";

function Home() {   // ← Cambié el nombre a Dashboard para que sea más claro
  return (
    <div style={{
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 16px',
    }}>
      <CameraScanner/>
      <CameraList />

      {/* Si aún quieres mantener el texto de bienvenida original */}
      <div>
      </div>
    </div>
  );
}

export default Home;