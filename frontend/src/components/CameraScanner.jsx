import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RadarIcon from "@mui/icons-material/Radar";
import CircularProgress from "@mui/material/CircularProgress";

function CameraScanner({ darkMode = true }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleScan = () => {
    if (isScanning) return;

    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      const random = Math.random();

      if (random > 0.7) {
        setScanResult("success");
      } else if (random > 0.3) {
        setScanResult("no-cameras");
      } else {
        setScanResult("error");
      }

      setIsScanning(false);
    }, 2800);
  };

  return (
    <div
      style={{
        width: "100%",
        marginBottom: "40px",
      }}
    >
      {/* CONTENEDOR DASHBOARD */}
      <div
        style={{
          background: darkMode ? "#1e293b" : "#ffffff",
          borderRadius: "16px",
          border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
          padding: "28px",
          width: "100%",
          maxWidth: "720px",
          margin: "0 auto",
          boxShadow: darkMode ? "0 10px 25px rgba(0,0,0,0.25)" : "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            marginBottom: "22px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "1.4rem",
              fontWeight: 600,
              color: darkMode ? "#f1f5f9" : "#0f172a",
            }}
          >
            Escáner de cámaras
          </h2>

          <p
            style={{
              marginTop: "8px",
              fontSize: "0.95rem",
              color: darkMode ? "#94a3b8" : "#64748b",
            }}
          >
            Detecta automáticamente cámaras IP en tu red local
          </p>
        </div>

        {/* BOTÓN */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleScan}
            disabled={isScanning}
            style={{
              position: "relative",
              padding: "16px 32px",
              fontSize: "1.05rem",
              fontWeight: 500,
              color: "white",
              background: isScanning ? "#334155" : "#3b82f6",
              border: "none",
              borderRadius: "12px",
              cursor: isScanning ? "wait" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 6px 16px rgba(59,130,246,0.25)",
              transition: "all 0.25s ease",
            }}
          >
            {isScanning ? (
              <>
                <div
                  style={{
                    position: "relative",
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <RadarIcon
                    sx={{
                      fontSize: 32,
                      animation: "radar-pulse 2s infinite ease-in-out",
                    }}
                  />

                  <CircularProgress
                    size={36}
                    thickness={4}
                    sx={{
                      position: "absolute",
                      color: "#60a5fa",
                      animation: "spin 1.4s linear infinite",
                    }}
                  />
                </div>

                <span>Buscando cámaras...</span>
              </>
            ) : (
              <>
                <SearchIcon />
                <span>Buscar cámaras cercanas</span>
              </>
            )}
          </button>
        </div>

        {/* RESULTADOS */}
        {scanResult && (
          <div
            style={{
              marginTop: "24px",
              padding: "16px 24px",
              borderRadius: "10px",
              background:
                scanResult === "success"
                  ? "rgba(34,197,94,0.15)"
                  : scanResult === "no-cameras"
                  ? "rgba(249,115,22,0.15)"
                  : "rgba(239,68,68,0.15)",
              border:
                scanResult === "success"
                  ? "1px solid #22c55e"
                  : scanResult === "no-cameras"
                  ? "1px solid #f97316"
                  : "1px solid #ef4444",
              color:
                scanResult === "success"
                  ? "#86efac"
                  : scanResult === "no-cameras"
                  ? "#fdba74"
                  : "#fca5a5",
              fontSize: "0.95rem",
              textAlign: "center",
              animation: "fadeIn 0.5s ease-out",
            }}
          >
            {scanResult === "success" && (
              <>¡Escaneo completado! Se encontraron nuevas cámaras.</>
            )}

            {scanResult === "no-cameras" && (
              <>No se detectaron cámaras nuevas en la red local.</>
            )}

            {scanResult === "error" && (
              <>
                Error durante el escaneo. Verifica tu red e inténtalo de nuevo.
              </>
            )}
          </div>
        )}
      </div>

      {/* Animaciones */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes radar-pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default CameraScanner;