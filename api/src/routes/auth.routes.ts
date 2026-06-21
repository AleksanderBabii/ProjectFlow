import { Router } from "express";
import { protect } from "../middleware/auth.middleware.ts";
import { me } from "../controllers/auth.controller.ts";


import {
  login,
  register,
} from "../controllers/auth.controller.ts";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);

export default router;