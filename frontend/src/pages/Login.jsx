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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Login;