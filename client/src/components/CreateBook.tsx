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
      <h1 className="text-3xl text-white text-left font-semibold mb-10 sm-screen">
        Your NoteBooks
      </h1>
      <form onSubmit={handleAddBook}>
        <label htmlFor="book-title" className="text-2xl text-white sm-screen">
          Notebook Title
        </label>
        <input
          id="book-title"
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          className="mt-1 mb-2 text-center block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 outline-none sm:text-lg bg-white h-8 text-3xl font-semibold"
        />
        <button className="text-lg rounded-lg px-3 py-1 border-1 text-black border-slate-900 font-medium cursor-pointer hover:shadow-2xl  hover:text-xl hover:text-green-900">
          <i className="fa-solid fa-plus mr-2"></i>
          Create NoteBook
        </button>
      </form>
    </div>
  );
}

export default App;
