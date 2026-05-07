import LoginSession from "../components/Login/StartSession";

function Login() {
  return (
    <div style={styles.container}>
      <LoginSession />
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f4ff",
  },
};

export default Login;
