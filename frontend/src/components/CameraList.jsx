import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function CameraList({ darkMode = true }) {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const [cameras] = useState([
    {
      id: "cam-001",
      name: "Entrada Principal",
      type: "IP Exterior 4MP IR",
      status: "connected",
      lastSeen: "en vivo ahora",
      preview: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: "cam-002",
      name: "Patio Trasero",
      type: "Domo Interior 2K",
      status: "connected",
      lastSeen: "hace 38 seg",
      preview: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: "cam-003",
      name: "Garaje Lateral",
      type: "Bullet 5MP ColorVu",
      status: "disconnected",
      lastSeen: "hace 14 horas",
    },
    {
      id: "cam-004",
      name: "Recepción Oficina",
      type: "PTZ 4K 25x Zoom",
      status: "connected",
      lastSeen: "hace 1 min",
      preview: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: "cam-005",
      name: "Callejón Posterior",
      type: "PTZ 1080p Auto-track",
      status: "connected",
      lastSeen: "en vivo ahora",
      preview: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ]);

  const handleViewLive = (cameraId) => {
    navigate(`/live/${cameraId}`);
  };

  const scroll = (direction) => {
    const container = carouselRef.current;
    if (!container) return;
    const scrollAmount = 320;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: 600,
            color: darkMode ? "#f1f5f9" : "#0f172a",
          }}
        >
          Cámaras conectadas
        </h2>

        <span
          style={{
            color: darkMode ? "#94a3b8" : "#64748b",
            fontSize: "0.95rem",
          }}
        >
          {cameras.length} cámaras
        </span>
      </div>

      <button
        onClick={() => scroll("left")}
        style={{
          position: "absolute",
          left: "-10px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: darkMode ? "#1e293b" : "#ffffff",
          border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          color: darkMode ? "white" : "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </button>

      <div
        ref={carouselRef}
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          paddingBottom: "10px",
          scrollBehavior: "smooth",
        }}
      >
        {cameras.map((cam) => {
          const isConnected = cam.status === "connected";

          return (
            <div
              key={cam.id}
              style={{
                minWidth: "300px",
                background: darkMode ? "#1e293b" : "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  darkMode
                    ? "0 20px 40px rgba(0,0,0,0.35)"
                    : "0 12px 24px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "180px",
                  background: "#000",
                  position: "relative",
                }}
              >
                {isConnected ? (
                  <video
                    src={cam.preview}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#64748b",
                      fontSize: "0.9rem",
                    }}
                  >
                    Cámara desconectada
                  </div>
                )}
              </div>

              <div style={{ padding: "18px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "1.1rem",
                      color: darkMode ? "#f1f5f9" : "#0f172a",
                    }}
                  >
                    {cam.name}
                  </h3>

                  <CircleIcon
                    sx={{
                      fontSize: 12,
                      color: isConnected ? "#22c55e" : "#ef4444",
                    }}
                  />
                </div>

                <div
                  style={{
                    color: darkMode ? "#94a3b8" : "#64748b",
                    fontSize: "0.9rem",
                    marginBottom: "10px",
                  }}
                >
                  {cam.type}
                </div>

                <div
                  style={{
                    color: darkMode ? "#64748b" : "#94a3b8",
                    fontSize: "0.8rem",
                    marginBottom: "16px",
                  }}
                >
                  {cam.lastSeen}
                </div>

                <button
                  onClick={() => isConnected && handleViewLive(cam.id)}
                  disabled={!isConnected}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: isConnected ? "#3b82f6" : (darkMode ? "#334155" : "#cbd5e1"),
                    border: "none",
                    borderRadius: "10px",
                    color: "white",
                    cursor: isConnected ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  {isConnected ? (
                    <>
                      <PlayCircleFilledIcon fontSize="small" />
                      Ver en vivo
                    </>
                  ) : (
                    <>
                      <VisibilityOffIcon fontSize="small" />
                      No disponible
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => scroll("right")}
        style={{
          position: "absolute",
          right: "-10px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: darkMode ? "#1e293b" : "#ffffff",
          border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          color: darkMode ? "white" : "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </button>
    </div>
  );
}

export default CameraList;
