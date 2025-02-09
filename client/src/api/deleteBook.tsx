export async function deleteBook(id: string) {
  await fetch(`http://localhost:3000/books/${id}`, {
    method: "DELETE",
  });
}
