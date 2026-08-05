import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../auth/context/authContext.js";

export default function Header() {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <header className="topbar">
      <div className="brand-group">
        <Link className="brand-link" to="/main"><span className="brand-icon">SG</span><span>Smart Greenhouse</span></Link>
        <NavLink className={({ isActive }) => isActive ? "top-link active" : "top-link"} to="/main">Dashboard</NavLink>
      </div>
      <div className="user-section">
        <span>{user.name}</span>
        <button className="secondary-btn compact" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}
