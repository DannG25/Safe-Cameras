import { useContext } from "react";
import { ThemeContext } from "../App";
import CameraScanner from "../components/CameraScanner"
import CameraList from "../components/CameraList";

function Home() {
  const darkMode = useContext(ThemeContext);

  return (
    <div style={{ width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "16px", backgroundColor: darkMode ? "#0f172a" : "#f8fafc", minHeight: "100vh" }}>
      <CameraScanner darkMode={darkMode} />
      <CameraList darkMode={darkMode} />
    </div>
  );
}

export default Home;
