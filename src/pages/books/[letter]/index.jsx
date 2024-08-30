import { useRouter } from "next/router";
import BookList from "@/components/layouts/Listbook";
import { useFetchBooks } from "@/features/book/useFetchBooks";

export default function BooksByLetter() {
  const router = useRouter();
  const { letter } = router.query;
  const { data: books, isLoading, error } = useFetchBooks();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const filteredBooks = letter
    ? books.filter((book) =>
        book.title.toLowerCase().startsWith(letter.toLowerCase())
      )
    : books;

  return <BookList books={filteredBooks} activeLetter={letter || "all"} />;
}
