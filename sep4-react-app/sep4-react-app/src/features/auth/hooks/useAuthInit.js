import { useEffect } from "react";
import { clearAuth, getToken, getUser } from "../utils/authStorage.js";
import { decodeToken } from "../utils/token.js";

export function useAuthInit(setToken, setUser, setLoading) {
  useEffect(() => {
    const token = getToken();
    const user = getUser();
    const decoded = token ? decodeToken(token) : null;

    if (!token || !decoded?.exp || decoded.exp * 1000 <= Date.now()) {
      clearAuth();
      setLoading(false);
      return;
    }

    setToken(token);
    setUser(user ?? { id: decoded.sub, name: decoded.name, email: decoded.email });
    setLoading(false);
  }, [setLoading, setToken, setUser]);
}
