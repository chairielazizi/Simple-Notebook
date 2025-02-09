import { useEffect, useState } from "react";
import CreateBook from "./CreateBook";
import { Link } from "react-router";
import { getBooks, Book } from "../api/getBooks";
import { deleteBook } from "../api/deleteBook";

function App() {
  const [books, setBooks] = useState<Book[]>([]); //empty array

  async function handleDelete(id: string) {
    await deleteBook(id);
    setBooks(books.filter((book) => book._id !== id));
  }

  async function fetchBook() {
    const bookList = await getBooks();
    setBooks(bookList);
  }
  useEffect(() => {
    console.log("Book list mounted");

    fetchBook();

    return () => {
      //run after component is unmounted
      console.log("cleanup");
    };
  }, []); // Add an empty dependency array to prevent infinite re-renders

  return (
    <div>
      {/* Pass the callback function as a prop */}
      <CreateBook onBookAdded={fetchBook} />
      <ul className="book-list">
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
      </ul>
    </div>
  );
}

export default App;
