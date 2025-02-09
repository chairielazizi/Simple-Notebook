import express, { Request, Response, NextFunction } from "express";
import Book from "../models/Book";

const router = express.Router();

//POST a new note
router.post(
  "/books/:bookId/notes",
  async (request: Request, response: Response, next: NextFunction) => {
    const bookId = request.params.bookId;
    console.log(bookId);
    const book = await Book.findById(bookId);
    if (!book) {
      return next({ message: "Book not found", statusCode: 404 });
    }
    const { note } = request.body;

    try {
      if (!book.notes) {
        book.notes = [];
      }
      book.notes.push(note);
      const newBook = await book.save();
      response.status(201).json(newBook);
    } catch (error: unknown) {
      if (error instanceof Error) {
        response.status(400).json({ message: error.message });
      } else {
        response.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }
);

//GET all notes from one book
router.get(
  "/books/:bookId/notes",
  async (request: Request, response: Response) => {
    const bookId = request.params.bookId;
    try {
      const book = await Book.findById(bookId);
      if (book) {
        response.json(book.notes);
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
  }
);

//DELETE one notebook
router.delete(
  "/books/:bookId/notes/:noteId",
  async (request: Request, response: Response) => {
    const bookId = request.params.bookId;
    const noteId = request.params.noteId;
    try {
      const book = await Book.findById(bookId);
      if (book) {
        if (!book.notes) {
          book.notes = [];
        }
        book.notes.splice(parseInt(noteId), 1);
        await book.save();
        response.json(book);
      } else {
        response.status(404).json({ message: "The note does not exist." });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      } else {
        response.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }
);

export default router;
