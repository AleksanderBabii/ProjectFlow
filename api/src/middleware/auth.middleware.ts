import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import type { AuthRequest } from "../types/authRequest.ts";
import type { JwtPayload } from "../types/jwtPayload.ts";

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader =
    req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Token not found");
  }

  try {
      const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT secret is not defined");
    }

    const decoded = jwt.verify(
      token,secret
    ) as JwtPayload;

    if (typeof decoded !== "object" || decoded ===null) {
      throw new Error("Invalid token payload");
    }

    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};