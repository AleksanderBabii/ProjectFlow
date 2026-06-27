import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
  registerSchema,
  RegisterFormData,
} from "../../../schemas/registerSchema";

import api from "../../../services/axios";

import Input from "../../ui/Input";
import Button from "../../ui/Button/Button"

const RegisterForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message ||
            error.message ||
            "Registration failed."
        );
      } else {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Registration failed."
        );
      }
    }
  };

  //Transfer button to the login page
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>

      <Input
        placeholder="Username"
        {...register("username")}
      />

      <Input
        type="email"
        placeholder="Email"
        {...register("email")}
      />

      <Input
        type="password"
        placeholder="Password"
        {...register("password")}
      />

      {errorMessage && (
        <p className="error">{errorMessage}</p>
      )}

      <Button type="submit">
        Register
      </Button>
      <Button
        type="button"
        onClick={handleLoginClick}
      >
        Already have an account? Login here!
      </Button>
    </form>
  );
};

export default RegisterForm;