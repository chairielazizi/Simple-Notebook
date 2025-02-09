export interface Book {
  _id: string;
  title: string;
}
export async function getBooks(): Promise<Book[]> {
  const response = await fetch("http://localhost:3000/books");
  return response.json();
}
