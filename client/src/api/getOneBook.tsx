import { API_URL } from "./config";
import { Book } from "./getBooks";

export async function getOneBook(bookId: string): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${bookId}`);
  return response.json();
}
