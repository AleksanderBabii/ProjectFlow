import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  RegisterFormData,
} from "../../../schemas/registerSchema";

import { registerUser } from "../../../api/authApi";

import Input from "../../ui/Input";
import Button from "../../ui/Button";

import styles from "./RegisterForm.module.scss";

const RegisterForm = () => {
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError("");

      await registerUser(data.username, data.email, data.password);

      navigate("/login");
    } catch {
      setServerError("Registration failed. Email may already be used.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {serverError && <p className={styles.error}>{serverError}</p>}

      <Input
        label="Username"
        placeholder="Alex"
        error={errors.username?.message}
        fullWidth
        {...register("username")}
      />

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
        placeholder="Minimum 8 characters"
        error={errors.password?.message}
        fullWidth
        {...register("password")}
      />

      <Button type="submit" fullWidth loading={isSubmitting}>
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;