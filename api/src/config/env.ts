import dotenv from "dotenv";
dotenv.config();

interface Env {
  PORT: string;
  JWT_SECRET: string;
  DB_URI: string;
}

const env: Env = {
  PORT: process.env.PORT || "5000", 
    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
    DB_URI: process.env.DB_URI || "postgresql://postgres:162998@localhost:5432/projectflow",
};

export default env;