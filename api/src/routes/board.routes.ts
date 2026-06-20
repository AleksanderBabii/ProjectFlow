import {Router} from "express";

import {
  getAllBoards,
  createNewBoard,
  updateBoard,
  deleteBoard,
} from "../controllers/board.controller.ts";

const router = Router();

router.get("/", getAllBoards);
router.post("/", createNewBoard);
router.put("/:id", updateBoard);
router.delete("/:id", deleteBoard);

export default router;
