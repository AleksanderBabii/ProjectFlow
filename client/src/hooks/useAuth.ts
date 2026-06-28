import { useState, useEffect } from "react";
import { getMe } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const user = await getMe();
        setUser(user);
      } catch (error) {
        console.error("Failed to restore session:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [token, setUser, logout]);

  return { loading };
};