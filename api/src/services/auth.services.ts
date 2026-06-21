import bcrypt from "bcryptjs";
import { prisma } from "../prisma/prisma.ts";
import { generateToken } from "../utils/jwt.ts";

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const registerUser = async ({
  username,
  email,
  password,
}: RegisterInput) => {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email: normalizedEmail,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};

export const loginUser = async ({
  email,
  password,
}: LoginInput) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  let isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch && user.password === password) {
    // Legacy user with plain-text password: migrate to hashed password.
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
    isMatch = true;
  }

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.id);

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
};

export const getCurrentUser = async (
  userId: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};