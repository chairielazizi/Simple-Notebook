import { API_URL } from "./config";

export interface Book {
  _id: string;
  title: string;
  notes: string[];
}
export async function getBooks(): Promise<Book[]> {
  const response = await fetch(`${API_URL}/books`);
  return response.json();
}
