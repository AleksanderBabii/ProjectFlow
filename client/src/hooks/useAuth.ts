import { useState, useEffect } from "react";
import {getMe} from "../api/authApi.ts";
import {useAuthStore} from "../store/authStore.ts";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const token = useAuthStore((state) => state.token);
    const setUser = useAuthStore((state) => state.setUser);
    const [loading, setLoading] = useState(true);
    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate();

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
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, [token, setUser, logout, navigate]);

    return { loading };
}