import express, { Request, Response } from "express";
import Book from "../models/Book";

const router = express.Router();

// GET all notes
router.get("/", async (request: Request, response: Response) => {
  try {
    const books = await Book.find();
    response.json(books);
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(500).json({ message: error.message });
      //   response.status(500).json({ message: (error as Error).message });
    } else {
      response.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

//POST a new note
router.post("/", async (request: Request, response: Response) => {
  const book = new Book(request.body);
  try {
    const newBook = await book.save();
    response.status(201).json(newBook);
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(500).json({ message: error.message });
    } else {
      response.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

// PATCH one note
router.patch("/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  const book = new Book(request.body);
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true });
    response.json(updatedBook);
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(500).json({ message: error.message });
    } else {
      response.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

//DELETE one note
router.delete("/:id", async (request: Request, response: Response) => {
  console.log(request.params.id);
  try {
    const book = await Book.findByIdAndDelete(request.params.id);
    if (book) {
      response.json(book);
    } else {
      response.status(404).json({ message: "Book not found" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(500).json({ message: error.message });
    } else {
      response.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

//GET one note
router.get("/:id", async (request: Request, response: Response) => {
  try {
    const book = await Book.findById(request.params.id);
    if (book) {
      response.json(book);
    } else {
      response.status(404).json({ message: "Book not found" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(500).json({ message: error.message });
    } else {
      response.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

export default router;
