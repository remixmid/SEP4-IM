import { useCallback, useState } from "react";
import { AuthContext } from "./authContext.js";
import { authService } from "../services/authService.js";
import { clearAuth, saveAuth } from "../utils/authStorage.js";
import { useAuthInit } from "../hooks/useAuthInit.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useAuthInit(setToken, setUser, setLoading);

  const login = useCallback(async (credentials) => {
    const result = await authService.login(credentials);
    saveAuth(result.token, result.user);
    setToken(result.token);
    setUser(result.user);
    return result;
  }, []);

  const register = useCallback((data) => authService.register(data), []);

  const logout = useCallback(() => {
    clearAuth();
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated: Boolean(token), login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
