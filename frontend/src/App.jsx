import { Outlet } from 'react-router-dom';

 function App() {
    return (
      <div style={{
        display: 'flex',
        minHeight: '100vh',
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
          <Outlet />
        </div>
      </div>
    );
 }

export default App;