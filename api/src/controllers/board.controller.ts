import type { Response } from "express";
import type{ AuthRequest } from "../types/authRequest.ts";
import {getBoardById} from "../services/board.services.ts"

import {
  getBoards,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../services/board.services.ts";

export const getAllBoards = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const ownerId = req.user?.userId;

    if (!ownerId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const boards = await getBoards(ownerId);

    return res.status(200).json(boards);
  } catch {
    return res.status(500).json({
      message: "Failed to fetch boards",
    });
  }
};

export const getBoard = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = req.params.id;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid board id" });
    }

    const board = await getBoardById(
      id,
      req.user!.userId
    );

    return res.status(200).json(board);
  } catch {
    return res.status(404).json({
      message: "Board not found",
    });
  }
};

export const createNewBoard = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { title, description } = req.body;
    const ownerId = req.user?.userId;

    if (!ownerId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!title || typeof title !== "string") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const board = await createBoard(
      title.trim(),
      ownerId,
      typeof description === "string" ? description.trim() : undefined
    );

    return res.status(201).json(board);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to create board",
    });
  }
};

export const editBoard = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const ownerId = req.user?.userId;

    if (!ownerId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const id = req.params.id;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid board id" });
    }

    const board = await updateBoard(
      id,
      req.body.title,
      ownerId,
      req.body.description
    );

    return res.status(200).json(board);
  } catch (error) {
    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Board not found",
    });
  }
};

export const removeBoard = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const ownerId = req.user?.userId;

    if (!ownerId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const id = req.params.id;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid board id" });
    }

    await deleteBoard(
      id,
      ownerId
    );

    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Board not found",
    });
  }
};
