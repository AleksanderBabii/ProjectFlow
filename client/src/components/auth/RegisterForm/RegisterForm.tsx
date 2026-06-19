import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  RegisterFormData,
} from "../../../schemas/registerSchema";

import api from "../../../services/axios";

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      await api.post(
        "/auth/register",
        data
      );

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  //Transfer button to the login page
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>

      <input
        placeholder="Username"
        {...register("username")}
      />

      <input
        type="email"
        placeholder="Email"
        {...register("email")}
      />

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
      />

      <button type="submit">
        Register
      </button>
      <button
        type="button"
        onClick={handleLoginClick}
      >
        Already have an account? Login here!
      </button>
    </form>
  );
};

export default RegisterForm;