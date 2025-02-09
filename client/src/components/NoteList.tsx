import { useEffect, useState } from "react";

interface Note {
  id: number;
  title: string;
}
function App() {
  const [notes, setNotes] = useState<Note[]>([]); //empty array

  useEffect(() => {
    console.log("Note list mounted");
    async function fetchNote() {
      const response = await fetch("http://localhost:3000/notes");
      const noteList = await response.json();
      setNotes(noteList);
    }
    fetchNote();

    return () => {
      //run after component is unmounted
      console.log("cleanup");
    };
  }, []); // Add an empty dependency array to prevent infinite re-renders

  return (
    <div>
      <ul className="note-list">
        {notes.map((note) => {
          return <li key={note.id}>{note.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
