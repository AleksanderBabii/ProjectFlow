import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  LoginFormData,
} from "../../../schemas/loginSchema";

import { login } from "../../../api/authApi";
import { useAuthStore } from "../../../store/authStore";

import Input from "../../ui/Input";
import Button from "../../ui/Button";

import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const loginToStore = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError("");

      const response = await login(data.email, data.password);

      loginToStore(response.token, response.user);

      navigate("/dashboard");
    } catch {
      setServerError("Invalid email or password.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {serverError && <p className={styles.error}>{serverError}</p>}

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        fullWidth
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Your password"
        error={errors.password?.message}
        fullWidth
        {...register("password")}
      />

      <Button type="submit" fullWidth loading={isSubmitting}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;