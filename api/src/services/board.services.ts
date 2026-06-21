//get the boards from the database
import { prisma } from "../prisma/prisma.ts";

export const getBoards = async (
  ownerId: string
) => {
  return prisma.board.findMany({
    where: {
      ownerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createBoard = async (
  title: string,
  ownerId: string,
  description: string
) => {
  return prisma.board.create({
    data: {
      title,
      ownerId,
      description,
    },
  });
};

export const updateBoard = async (
  id: string,
  title: string,
  ownerId: string,
  description: string
) => {
  const board = await prisma.board.findFirst({
    where: {
      id,
      ownerId,
    },
  });

  if (!board) {
    throw new Error("Board not found");
  }

  return prisma.board.update({
    where: {
      id,
    },
    data: {
      title,
      description,
    },
  });
};

export const deleteBoard = async (
  id: string,
  ownerId: string
) => {
  const board = await prisma.board.findFirst({
    where: {
      id,
      ownerId,
    },
  });

  if (!board) {
    throw new Error("Board not found");
  }

  return prisma.board.delete({
    where: {
      id,
    },
  });
};