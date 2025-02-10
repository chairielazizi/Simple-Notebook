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
    <div className="create-book">
      <h1 className="text-3xl text-white text-left font-semibold mb-10">
        Your NoteBooks
      </h1>
      <form onSubmit={handleAddBook}>
        <label htmlFor="book-title" className="text-2xl text-white">
          Notebook Title
        </label>
        <input
          id="book-title"
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          className="mt-1 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white h-8"
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
