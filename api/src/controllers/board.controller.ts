import type { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import type { AuthRequest } from "../types/authRequest.ts";
import {
  getBoards,
  createBoard,
  updateBoard as updateBoardService,
  deleteBoard as deleteBoardService,
} from "../services/board.services.ts";

export const getAllBoards = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const boards = await getBoards(req.user.userId);
    return res.status(200).json(boards);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch boards",
    });
  }
};

export const createNewBoard = async (
  req: Request,
  res: Response
) => {
  try {
    const board = await createBoard(req.body);
    return res.status(201).json(board);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        message: "Board name already exists",
      });
    }

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to create board",
    });
  }
};

export const updateBoard = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const boardId = req.params.id;
    if (typeof boardId !== "string") {
      return res.status(400).json({
        message: "Invalid board id",
      });
    }

    const board = await updateBoardService(
      boardId,
      req.body
    );
    return res.status(200).json(board);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to update board",
    });
  }
};

export const deleteBoard = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const boardId = req.params.id;
    if (typeof boardId !== "string") {
      return res.status(400).json({
        message: "Invalid board id",
      });
    }

    await deleteBoardService(boardId);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete board",
    });
  }
};
