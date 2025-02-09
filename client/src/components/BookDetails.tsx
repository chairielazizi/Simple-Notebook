import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import { createNote } from "../api/createNote";
import { getOneBook } from "../api/getOneBook";
import { Book } from "../api/getBooks";

function App() {
  const [book, setBook] = useState<Book | undefined>();
  const [notes, setNotes] = useState<string[]>([]); //empty array
  const [text, setText] = useState("");
  const { bookId } = useParams(); //get the bookId from the URL

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    const { notes: serverNotes } = await createNote(bookId!, text);
    setNotes(serverNotes);
    setText("");
  }
  // async function handleDelete(id: string) {
  //   await deleteBook(id);
  //   setBooks(books.filter((book) => book._id !== id));
  // }

  useEffect(() => {
    console.log("Note list mounted");
    if (!bookId) return;
    async function fetchBook() {
      const noteList = await getOneBook(bookId!);
      setBook(noteList);
      setNotes(noteList.notes);
    }

    fetchBook();

    return () => {
      //run after component is unmounted
      console.log("cleanup");
    };
  }, [bookId]); // Add an empty dependency array to prevent infinite re-renders

  return (
    <div>
      <form onSubmit={handleAddNote}>
        <label htmlFor="book-title" className="text-3xl text-white">
          Notes
        </label>
        <input
          id="book-title"
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
          className="mt-1 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white"
        />
        <button>
          <i className="fa-solid fa-plus mr-2"></i>
          Add Note
        </button>
      </form>

      <ul className="book-list">
        {notes.map((note) => {
          return (
            <li key={note}>
              {/* <button onClick={() => handleDelete(book._id)}>
                <i className="fa-solid fa-trash-can text-red-500"></i>
              </button> */}
              {note}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
