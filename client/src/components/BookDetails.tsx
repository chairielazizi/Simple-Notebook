import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getBooks, Book } from "../api/getBooks";
import { deleteBook } from "../api/deleteBook";
import { useParams } from "react-router";
import { createNote } from "../api/createNote";

function App() {
  // const [books, setBooks] = useState<Book[]>([]); //empty array
  const [text, setText] = useState("");
  const { bookId } = useParams(); //get the bookId from the URL

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    const note = await createNote(bookId!, text);
    // setBooks([...books, note]);
    setText("");
  }
  // async function handleDelete(id: string) {
  //   await deleteBook(id);
  //   setBooks(books.filter((book) => book._id !== id));
  // }

  // async function fetchBook() {
  //   const bookList = await getBooks();
  //   setBooks(bookList);
  // }
  useEffect(() => {
    console.log("Book list mounted");

    // fetchBook();

    return () => {
      //run after component is unmounted
      console.log("cleanup");
    };
  }, []); // Add an empty dependency array to prevent infinite re-renders

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

      {/* <ul className="book-list">
        {books.map((book) => {
          return (
            <li key={book._id}>
              <button onClick={() => handleDelete(book._id)}>
                <i className="fa-solid fa-trash-can text-red-500"></i>
              </button>
              <Link to={`/books/${book._id}`}>{book.title}</Link>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
}

export default App;
