import { useState } from "react";
import "../App.css";
import { createBook } from "../api/createBook";

interface Props {
  onBookAdded: () => void;
}
function App({ onBookAdded }: Props) {
  const [title, setTitle] = useState("");

  async function handleAddBook(e: React.FormEvent) {
    e.preventDefault();
    await createBook(title);
    setTitle("");
    onBookAdded(); // Call the callback function
  }
  return (
    <div className="App">
      <form onSubmit={handleAddBook}>
        <label htmlFor="book-title" className="text-3xl text-white">
          NoteBooks
        </label>
        <input
          id="book-title"
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          className="mt-1 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white"
        />
        <button>
          <i className="fa-solid fa-plus mr-2"></i>
          Create NoteBook
        </button>
      </form>
    </div>
  );
}

export default App;
