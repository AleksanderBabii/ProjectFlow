import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.ts";
import boardRoutes from "./routes/board.routes.ts";
import taskRoutes from "./routes/task.routes.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/boards", boardRoutes);
app.use("/", taskRoutes);

export default app;