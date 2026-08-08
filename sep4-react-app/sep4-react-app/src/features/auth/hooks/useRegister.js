import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.js";

export function useRegister() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(data) {
    setLoading(true);
    setMessage("");
    try {
      const result = await register(data);
      setMessage(result.message);
      navigate("/login");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { handleRegister, loading, message };
}
