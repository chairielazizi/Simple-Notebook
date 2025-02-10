import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createNote } from "../api/createNote";
import { getOneBook } from "../api/getOneBook";
import { Book } from "../api/getBooks";
import { deleteNote } from "../api/deleteNote";

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

  async function handleDeleteNote(noteId: number) {
    if (!bookId) return;
    const newBook = await deleteNote(bookId, noteId);
    setNotes(newBook.notes);
  }

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
      <h1 className="text-3xl text-white text-left font-semibold mb-10">
        {book?.title}
      </h1>
      <ul className="book-list">
        {notes.map((note, noteId) => {
          return (
            <li key={noteId}>
              <button onClick={() => handleDeleteNote(noteId)}>
                <i className="fa-solid fa-trash-can text-red-500"></i>
              </button>
              {note}
            </li>
          );
        })}
      </ul>

      <form onSubmit={handleAddNote}>
        <label htmlFor="book-title" className="text-2xl text-white">
          Note Title
        </label>
        <input
          id="book-title"
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
          className="mt-1 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white h-8"
        />
        <div className="note-button">
          <a href="/">
            <i className="fa-solid fa-arrow-left mr-2 text-3xl text-white hover:cursor-pointer hover:text-blue-300"></i>
          </a>
          <button>
            <i className="fa-solid fa-plus mr-2"></i>
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
