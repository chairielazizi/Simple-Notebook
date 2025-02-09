import { API_URL } from "./config";
import { Book } from "./getBooks";

export async function deleteNote(
  bookId: string,
  noteId: number
): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${bookId}/notes/${noteId}`, {
    method: "DELETE",
  });

  return response.json();
}
