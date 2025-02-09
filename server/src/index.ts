import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
const app = express();
import mongoose from "mongoose";
const PORT = 3000;
import cors from "cors";

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

//fix cors error
app.use(
  cors({
    origin: "http://localhost:5173", // allow requests from this origin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // allow these methods
    allowedHeaders: ["Content-Type", "Authorization"], // allow these headers
  })
);

// accept json request
app.use(express.json());

// routes
import bookRouter from "../routes/BooksRoute";
app.use("/books", bookRouter);

import noteRouter from "../routes/NotesRoute";
app.use("", noteRouter);
