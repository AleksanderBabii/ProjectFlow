import type { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import type {AuthRequest} from "../types/authRequest.ts";
import {getCurrentUser} from "../services/auth.services.ts";


import {
  loginUser,
  registerUser,
} from "../services/auth.services.ts";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json(user);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    if (
      error instanceof Error &&
      error.message === "Email already registered"
    ) {
      return res.status(409).json({
        message: error.message,
      });
    }

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

export const me = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = await getCurrentUser(
      req.user!.userId
    );

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "User not found",
    });
  }
};