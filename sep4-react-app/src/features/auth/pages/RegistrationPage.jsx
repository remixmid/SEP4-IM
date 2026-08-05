import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister.js";

export default function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleRegister, loading, message } = useRegister();

  return (
    <div className="auth-page">
      <section className="auth-hero">
        <span className="eyebrow">Local mock platform</span>
        <h1>Create a grower account</h1>
        <p>Your profile, greenhouse zones and feedback are stored locally in the browser for the demo.</p>
      </section>
      <section className="auth-card">
        <h2>Register</h2>
        <form onSubmit={(event) => { event.preventDefault(); handleRegister({ name, email, password }); }}>
          <label>Name<input aria-label="Name" value={name} onChange={(event) => setName(event.target.value)} minLength="2" required /></label>
          <label>Email<input aria-label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label>Password<input aria-label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength="6" required /></label>
          <button className="primary-btn full-width" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
        </form>
        {message && <p className="form-message">{message}</p>}
        <p className="auth-switch">Already registered? <Link to="/login">Login</Link></p>
      </section>
    </div>
  );
}
