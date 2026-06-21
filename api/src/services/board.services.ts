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

export const getBoardById = async (
  boardId: string,
  ownerId: string
) => {
  return prisma.board.findFirst({
    where: {
      id: boardId,
      ownerId,
    },
  });
};

export const createBoard = async (
  title: string,
  ownerId: string,
  description?: string
) => {
  if (!title || typeof title !== "string") {
    throw new Error("Board title is required");
  }

  if (!ownerId || typeof ownerId !== "string") {
    throw new Error("Owner ID is required");
  }

  const data: {
    title: string;
    ownerId: string;
    description?: string;
  } = {
    title,
    ownerId,
  };

  if (description !== undefined) {
    data.description = description;
  }

  return prisma.board.create({
    data,
  });
};

export const updateBoard = async (
  id: string,
  title: string,
  ownerId: string,
  description?: string
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

  const updateData: {
    title: string;
    description?: string;
  } = {
    title,
  };

  if (description !== undefined) {
    updateData.description = description;
  }

  return prisma.board.update({
    where: {
      id,
    },
    data: updateData,
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