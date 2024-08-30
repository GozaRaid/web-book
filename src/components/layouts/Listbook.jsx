import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export default function Listbook({ books, activeLetter = "all" }) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState(activeLetter);

  const filteredBooks = useMemo(() => {
    if (activeFilter === "all") return books;
    return books.filter((book) =>
      book.title.toLowerCase().startsWith(activeFilter.toLowerCase())
    );
  }, [activeFilter, books]);

  const handlerClickBook = (book) => {
    const bookLetter = book.title.charAt(0).toLowerCase();
    const letter = activeFilter === "all" ? bookLetter : activeFilter;
    router.push(`/books/${letter}/${book.id}`);
  };

  const handleFilterChange = (newFilter) => {
    setActiveFilter(newFilter);
    router.push(
      newFilter === "all" ? "/books" : `/books/${newFilter}`,
      undefined,
      { shallow: true }
    );
  };

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="container py-12 mx-auto">
      <nav className="mb-8 overflow-x-auto">
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            key="all"
            variant={activeFilter === "all" ? "primary" : "outline"}
            className="text-xs"
            onClick={() => handleFilterChange("all")}
            aria-label="Show all books"
          >
            All
          </Button>
          {alphabet.map((letter) => (
            <Button
              key={letter}
              className="text-xs"
              variant={activeFilter === letter ? "primary" : "outline"}
              onClick={() => handleFilterChange(letter)}
              aria-label={`Filter books starting with ${letter.toUpperCase()}`}
            >
              {letter.toUpperCase()}
            </Button>
          ))}
        </div>
      </nav>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            onClick={() => handlerClickBook(book)}
            className="flex flex-col overflow-hidden shadow-md cursor-pointer rounded-xl bg-background"
          >
            <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
              <img
                src={book.book_image_url}
                alt={`Cover of ${book.title}`}
                className="absolute inset-0 w-full h-full object-fit rounded-t-xl "
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold md:text-md">{book.title}</h3>
              <p className="text-sm text-muted-foreground">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
