// ── Estilos ────────────────────────────────────────────────────────────────────
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    justifyContent: "flex-end",
  },
  panel: {
    width: "420px",
    height: "100vh",
    boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
    background: "linear-gradient(135deg, #e3eeff 0%, #f0f4ff 100%)",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    padding: "40px 36px",
    boxSizing: "border-box",
  },

  // Brand
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "36px",
  },
  brandIcon: {
    fontSize: "28px",
    color: "#1976d2",
  },
  brandName: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a1a2e",
    letterSpacing: "-0.5px",
  },

  // Tabs
  tabBar: {
    display: "flex",
    borderRadius: "10px",
    padding: "4px",
    marginBottom: "28px",
  },
  tab: {
    flex: 1,
    padding: "10px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    color: "#666",
    borderRadius: "7px",
    transition: "all 0.2s",
  },
  activeTab: {
    flex: 1,
    padding: "10px",
    border: "none",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    color: "#1976d2",
    borderRadius: "7px",
    transition: "all 0.2s",
  },

  // Titles
  title: {
    margin: "0 0 6px",
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a1a2e",
  },
  subtitle: {
    margin: "0 0 24px",
    fontSize: "14px",
    color: "#888",
  },

  // Form
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px",
  },
  input: {
    padding: "12px 14px",
    border: "1.5px solid #e0e4ef",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  inputError: {
    borderColor: "#e53935",
  },
  errorMsg: {
    marginTop: "4px",
    fontSize: "12px",
    color: "#e53935",
    paddingLeft: "2px",
  },
  button: {
    marginTop: "8px",
    padding: "13px",
    background: "linear-gradient(135deg, #1976d2, #1565c0)",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
    letterSpacing: "0.3px",
    boxShadow: "0 4px 14px rgba(25,118,210,0.35)",
    transition: "opacity 0.2s",
  },

  // Footer
  footerText: {
    marginTop: "auto",
    paddingTop: "32px",
    textAlign: "center",
    fontSize: "14px",
    color: "#888",
  },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#1976d2",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px",
    padding: 0,
  },
};

export default styles;