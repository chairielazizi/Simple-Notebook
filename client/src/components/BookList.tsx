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
            <li
              key={book._id}
              className="outline-none bg-white hover:bg-gray-100 border border-gray-200 hover:border-2 hover:border-green-600 rounded-lg"
            >
              <button
                onClick={() => handleDelete(book._id)}
                className="border py-2 px-4 border-gray-50 hover:border-red-700 hover:ring-red-700 outline-none cursor-pointer rounded-lg text-lg"
              >
                <i className="fa-solid fa-trash-can text-red-500 text-lg"></i>
              </button>
              <Link
                to={`/books/${book._id}`}
                className="text-2xl hover:text-green-400 hover:font-medium"
              >
                {book.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
