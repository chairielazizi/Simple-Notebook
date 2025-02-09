import { API_URL } from "./config";

export async function deleteBook(id: string) {
  await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
  });
}
