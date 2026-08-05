import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.js";

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(credentials) {
    setLoading(true);
    setMessage("");
    try {
      await login(credentials);
      navigate("/main");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { handleLogin, loading, message };
}
