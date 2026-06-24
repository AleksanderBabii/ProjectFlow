import dotenv from "dotenv";
dotenv.config();

interface Env {
  PORT: string;
  JWT_SECRET: string;
  DATABASE_URL: string;
}

const env: Env = {
  PORT: process.env.PORT || "5000", 
    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
    DATABASE_URL: process.env.DB_URI || "postgresql://postgres:162998@localhost:5432/projectflow",
};

export default env;