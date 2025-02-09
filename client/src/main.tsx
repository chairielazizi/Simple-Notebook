import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
// import CreateNote from "./components/CreateNote.tsx";
import NoteList from "./components/NoteList.tsx";
import NoteDetails from "./components/NoteDetails.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <CreateNote /> fix to automatically display the note list after successfully added*/}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/notes/:noteId" element={<NoteDetails />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
