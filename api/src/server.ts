// simple server.ts file for the API
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/boards", async (req, res) => {
  const boards = await prisma.board.findMany();
  res.json(boards);
});

app.post("/boards", async (req, res) => {
  const { title, description } = req.body;
  const newBoard = await prisma.board.create({
    data: { title, description },
  });
  res.json(newBoard);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
