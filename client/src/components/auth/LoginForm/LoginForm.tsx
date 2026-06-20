import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
  loginSchema,
  LoginFormData,
} from "../../../schemas/loginSchema";

import api from "../../../services/axios";
import { useAuthStore } from "../../../store/authStore";

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const login = useAuthStore(
    (state) => state.login
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      const response = await api.post(
        "/auth/login",
        data
      );

      login(
        response.data.token,
        response.data.user
      );

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message ||
            error.message ||
            "Login failed."
        );
      } else {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Login failed."
        );
      }
    }
  };

  //Transfer button to the register page
  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>

      {errorMessage && (
        <p className="error">{errorMessage}</p>
      )}

      <input
        type="email"
        placeholder="Email"
        {...register("email")}
      />

      {errors.email && (
        <p>{errors.email.message}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
      />

      {errors.password && (
        <p>{errors.password.message}</p>
      )}

      <button type="submit">
        Login
      </button>
      <button
        type="button"
        onClick={handleRegisterClick}
      >
        Not with us yet? Register here!
      </button>
    </form>
  );
};

export default LoginForm;