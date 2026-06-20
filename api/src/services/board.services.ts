//get the boards from the database

import type { Board,Prisma } from "@prisma/client/edge";
import { prisma } from "../prisma/prisma.ts";

type BoardInput = Prisma.BoardCreateInput;

export const getBoards = async (userId: string): Promise<Board[]> => {
  const boards = await prisma.board.findMany({
    where: {
      ownerId: userId,
    },
  });
  return boards;
}

export const createBoard = async (boardData: BoardInput): Promise<Board> => {
  const board = await prisma.board.create({
    data: boardData,
  });
  return board;
}

export const updateBoard = async (id: string, boardData: Partial<BoardInput>): Promise<Board | null> => {
  const board = await prisma.board.update({
    where: { id },
    data: boardData,
  });
  return board;
}

export const deleteBoard = async (id: string): Promise<void> => {
  await prisma.board.delete({
    where: { id },
  });
}
