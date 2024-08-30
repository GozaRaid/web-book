import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselBooks({ books, title, isLoading, error }) {
  const [showNavigation, setShowNavigation] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(2);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerView(5);
      } else if (window.innerWidth >= 1024) {
        setItemsPerView(4);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(3);
      } else {
        setItemsPerView(2);
      }
      setShowNavigation(books.length > itemsPerView);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [books, itemsPerView]);

  const handlerClickBook = (book) => {
    const letter = book.title.charAt(0).toLowerCase();
    router.push(`/books/${letter}/${book.id}`);
  };

  return (
    <section className="w-full py-6 sm:py-12 lg:py-16">
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 text-2xl font-bold sm:text-3xl">{title}</h2>
        {isLoading ? (
          <p>Loading books...</p>
        ) : error ? (
          <p>Error loading books. Please try again later.</p>
        ) : (
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: itemsPerView,
            }}
            className="relative w-full max-w-full"
          >
            <CarouselContent>
              {books.map((book) => (
                <CarouselItem
                  key={book.id}
                  onClick={() => handlerClickBook(book)}
                  className="cursor-pointer basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: "3/4" }}
                  >
                    <img
                      src={book.book_image_url}
                      alt={book.title}
                      className="object-cover rounded-md "
                      style={{
                        aspectRatio: "2/3",
                        objectFit: "cover",
                      }}
                    />
                    <div className="absolute inset-0 flex items-end justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">
                      <div className="w-full h-[40%] bg-gradient-to-t from-black/70 to-transparent text-white text-center p-2 rounded-b-xl flex items-center justify-center">
                        {book.title}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {showNavigation && (
              <>
                <CarouselPrevious className="absolute -translate-y-1/2 top-1/2 left-1" />
                <CarouselNext className="absolute -translate-y-1/2 top-1/2 right-1" />
              </>
            )}
          </Carousel>
        )}
      </div>
    </section>
  );
}
