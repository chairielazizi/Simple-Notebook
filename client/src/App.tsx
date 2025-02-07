import { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    await fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });
    setTitle("");
  }
  return (
    <div className="App">
      <form onSubmit={handleAddNote}>
        <label htmlFor="deck-title ">Notes</label>
        <input
          id="deck-title"
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Add Note</button>
      </form>
    </div>
  );
}

export default App;
