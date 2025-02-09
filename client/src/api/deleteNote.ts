import { API_URL } from "./config";

export async function deleteNote(bookId: string, noteId: number) {
  await fetch(`${API_URL}/books/${bookId}/notes/${noteId}`, {
    method: "DELETE",
  });
}
