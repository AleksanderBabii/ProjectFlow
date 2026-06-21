import { Router } from "express";
import {
  createTask,
  getTasksByBoard,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.ts";
import { protect } from "../middleware/auth.middleware.ts";

const router = Router();

router.use(protect);

router.get(
    "/board/:boardId/tasks",
    getTasksByBoard
)

router.post(
    "/board/:boardId/tasks",
    createTask
)

router.put(
    "/task/:taskId",
    updateTask
)
router.delete(
    "/task/:taskId",
    deleteTask
)

export default router;