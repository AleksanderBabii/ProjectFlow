import { Router } from "express";

import {
  getAllBoards,
  createNewBoard,
  editBoard,
  removeBoard,
  getBoard
} from "../controllers/board.controller.ts";

import { protect } from "../middleware/auth.middleware.ts";

const router = Router();

router.use(protect);

router.get("/", getAllBoards);

router.get("/:id", getBoard);

router.post("/", createNewBoard);

router.put("/:id", editBoard);

router.delete("/:id", removeBoard);



export default router;
