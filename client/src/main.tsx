import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import CreateNote from "./components/CreateNote.tsx";
import NoteList from "./components/NoteList.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <CreateNote /> fix to automatically display the note list after successfully added*/}
    <NoteList />
  </StrictMode>
);
