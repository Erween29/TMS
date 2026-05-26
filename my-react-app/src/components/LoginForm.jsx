import { useState } from "react";

const MOCK_USER = {
  email: "user@example.com",
  password: "1234",
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    // Simulate an API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        setIsLoggedIn(true);
      } else {
        setError("Invalid email or password.");
      }
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  if (isLoggedIn) {
    return (
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome! 🎉</h2>
        <p style={styles.subtitle}>
          You are logged in as <strong>{email}</strong>
        </p>
        <button style={styles.button} onClick={handleLogout}>
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Login</h2>
      <p style={styles.hint}>
        Use <strong>user@example.com</strong> / <strong>password123</strong>
      </p>

      <div onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button
          style={{ ...styles.button, opacity: isLoading ? 0.7 : 1 }}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
    background: "#fff",
  },
  title: { margin: "0 0 8px", fontSize: "24px", fontWeight: "700" },
  subtitle: { color: "#555", marginBottom: "24px" },
  hint: { fontSize: "13px", color: "#888", marginBottom: "20px" },
  field: { marginBottom: "16px" },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1.5px solid #ddd",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  error: { color: "#e53e3e", fontSize: "14px", marginBottom: "8px" },
};
