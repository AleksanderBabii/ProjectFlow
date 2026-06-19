import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  LoginFormData,
} from "../../../schemas/loginSchema";

import api from "../../../services/axios";
import { useAuthStore } from "../../../store/authStore";

const LoginForm = () => {
  const navigate = useNavigate();

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

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  //Transfer buuton to the register page
  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>

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