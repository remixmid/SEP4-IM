import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin.js";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@greenhouse.local");
  const [password, setPassword] = useState("demo123");
  const { handleLogin, loading, message } = useLogin();

  return (
    <div className="auth-page">
      <section className="auth-hero">
        <span className="eyebrow">Interactive Media Project</span>
        <h1>Smart Greenhouse</h1>
        <p>Monitor environmental data, review crop recommendations and inspect simulated automation decisions.</p>
      </section>
      <section className="auth-card">
        <h2>Welcome back</h2>
        <p className="muted">Use the demo account or register a new grower.</p>
        <form onSubmit={(event) => { event.preventDefault(); handleLogin({ email, password }); }}>
          <label>Email<input aria-label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label>Password<input aria-label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          <button className="primary-btn full-width" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
        {message && <p className="form-message error-text">{message}</p>}
        <p className="auth-switch">No account yet? <Link to="/register">Register</Link></p>
        <div className="demo-credentials"><strong>Demo:</strong> demo@greenhouse.local / demo123</div>
      </section>
    </div>
  );
}
