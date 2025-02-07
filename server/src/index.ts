import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
const app = express();
import mongoose from "mongoose";
const PORT = 3000;

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const db = mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}!`);
    });
  })
  .catch((err) => console.error(err));

// accept json request
app.use(express.json());

// routes
import noteRouter from "../routes/Notes";
app.use("/notes", noteRouter);
