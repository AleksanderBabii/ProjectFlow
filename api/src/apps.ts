import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.ts";
import boardRoutes from "./routes/board.routes.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/boards", boardRoutes);

export default app;