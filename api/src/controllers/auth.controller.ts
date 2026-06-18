import type { Request, Response } from "express";
import {
  loginUser,
  registerUser,
} from "../services/auth.services.js";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Registration failed",
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await loginUser(req.body);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(401).json({
      message:
        error instanceof Error
          ? error.message
          : "Login failed",
    });
  }
};