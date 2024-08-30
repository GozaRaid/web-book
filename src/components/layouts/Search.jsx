import { useRouter } from "next/router";
import { useFetchSearchBooks } from "@/features/book/useFetchSearchBooks";
import { useEffect, useState } from "react";

export default function Searchpage() {
  const router = useRouter();
  const { search: query } = router.query;
  const [books, setBooks] = useState([]);

  const { data, isLoading, error } = useFetchSearchBooks(query);

  useEffect(() => {
    if (data) {
      setBooks(data.data.books);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  const booksFound = books.length > 0;

  const handlerClickBook = (book) => {
    const letter = book.title.charAt(0).toLowerCase();
    router.push(`/books/${letter}/${book.id}`);
  };

  return (
    <div className="container w-full p-4 mx-auto shadow-none sm:px-4 md:p-10">
      <div className="pb-6">
        <h1 className="text-3xl font-bold">
          {booksFound ? (
            <>
              Search results for <span className="ml-2">"{query}"</span>
            </>
          ) : (
            <>
              Search results for <span className="ml-2">"{query}"</span> not
              found
            </>
          )}
        </h1>
      </div>
      {booksFound ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => handlerClickBook(book)}
              className="flex flex-row overflow-hidden shadow-md cursor-pointer rounded-xl bg-background"
            >
              <img
                src={book.book_image_url || "./placeholder.svg"}
                alt={book.title}
                className="w-[140px] md:w-[170px] object-cover rounded-l-md"
                style={{
                  aspectRatio: "2/3",
                  objectFit: "cover",
                }}
              />
              <div className="flex flex-col p-4 pr-2 ">
                <h3 className="mb-2 font-bold text-md md:text-lg">
                  {book.title} - {book.author}
                </h3>
                <p className="h-[150px] lg:h-[170px] overflow-y-auto text-sm text-muted-foreground md:text-base">
                  {book.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-muted-foreground">
          No books found for this title.
        </p>
      )}
      <div className="flex justify-center mt-8"></div>
    </div>
  );
}
