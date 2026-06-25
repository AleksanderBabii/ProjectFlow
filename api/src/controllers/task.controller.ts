import type { Response } from "express";
import type { AuthRequest } from "../types/authRequest.ts";
import {
  getTasksByBoard as getTasksByBoardService,
  createTask as createTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
} from "../services/task.services.ts";

export const getTasksByBoard = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const boardId = req.params.boardId;
    if (!boardId || Array.isArray(boardId)) {
      return res.status(400).json({ message: "Invalid board id" });
    }

    const tasks = await getTasksByBoardService(boardId);
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch tasks",
    });
  }
};

export const createTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const boardId = req.params.boardId;
    if (!boardId || Array.isArray(boardId)) {
      return res.status(400).json({ message: "Invalid board id" });
    }

    const { title, description, priority } = req.body;
    if (!title || typeof title !== "string") {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await createTaskService(boardId, {
      title,
      description,
      priority: priority ?? "MEDIUM",
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to create task",
    });
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const taskId = req.params.taskId;
    if (!taskId || Array.isArray(taskId)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const { title, description, priority, status } = req.body;
    const task = await updateTaskService(taskId, {
      title,
      description,
      priority,
      status,
    });

    return res.status(200).json(task);
  } catch (error) {
    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to update task",
    });
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const taskId = req.params.taskId;
    if (!taskId || Array.isArray(taskId)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const deleted = await deleteTaskService(taskId);
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete task",
    });
  }
};
