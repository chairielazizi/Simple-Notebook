import { useState } from "react";
import "../App.css";

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
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    setTitle("");
  }
  return (
    <div className="App">
      <form onSubmit={handleAddNote}>
        <label htmlFor="deck-title" className="text-3xl text-white">
          Notes
        </label>
        <input
          id="deck-title"
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          className="mt-1 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white"
        />
        <button>Add Note</button>
      </form>
    </div>
  );
}

export default App;
