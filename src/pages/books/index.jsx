// pages/books/index.jsx
import { useRouter } from "next/router";
import BookList from "@/components/layouts/Listbook";
import { useFetchBooks } from "@/features/book/useFetchBooks";

export default function BooksIndex() {
  const router = useRouter();
  const { data: books, isLoading, error } = useFetchBooks();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return <BookList books={books} />;
}
