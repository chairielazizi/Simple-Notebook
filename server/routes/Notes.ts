import express, { Request, Response } from "express";
import Note from "../models/Note";

const router = express.Router();

// GET all notes
router.get("/", async (request: Request, response: Response) => {
  try {
    const notes = await Note.find();
    response.json(notes);
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
  const note = new Note(request.body);
  try {
    const newNote = await note.save();
    response.status(201).json(newNote);
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
  const note = new Note(request.body);
  try {
    const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true });
    response.json(updatedNote);
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
  try {
    const note = await Note.findByIdAndDelete(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).json({ message: "Note not found" });
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
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).json({ message: "Note not found" });
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
