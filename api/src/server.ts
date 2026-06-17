import express from "express";
import cors from "cors";
import { PrismaClient } from  "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());



// GET /auth/me
app.get("/auth/me", async (req, res) => {
  const userId = req.headers["user-id"] as string;
  if (!userId) {
    return res.status(401).json({ error: "User ID header is missing" });
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

// POST /auth/register
app.post("/auth/register", async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = await prisma.user.create({
    data: { username, email, password },
  });
  res.json(newUser);
});
//POST /auth/login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  res.json(user);
});

// GET /boards
app.get("/boards", async (req, res) => {
  const boards = await prisma.board.findMany();
  res.json(boards);
});
// POST /boards
app.post("/boards", async (req, res) => {
  const { title, description } = req.body;
  const newBoard = await prisma.board.create({
    data: { title, description, ownerId: "alex" }, 
  });
  res.json(newBoard);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
