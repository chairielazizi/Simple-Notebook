import { API_URL } from "./config";
import { Book } from "./getBooks";

export async function createNote(bookId: string, note: string): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${bookId}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      note,
    }),
  });

  return response.json();
}
