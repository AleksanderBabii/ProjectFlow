import { Router } from "express";
import {
  getAllTasksByUser,
  getTasksByBoard,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.ts";
import { protect } from "../middleware/auth.middleware.ts";

const router = Router();

router.use(protect);

router.get("/tasks", protect, getAllTasksByUser);

router.get("/boards/:boardId/tasks", getTasksByBoard);
router.post("/boards/:boardId/tasks", createTask);

router.put("/task/:taskId", updateTask);
router.delete("/task/:taskId", deleteTask);

export default router;
