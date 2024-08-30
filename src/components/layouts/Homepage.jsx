import { Button } from "@/components/ui/button";
import { useFetchUpcomingBooks } from "@/features/book/useFetchUpcomingBooks";
import { useFetchRecomendationBooks } from "@/features/book/useFetchRecomendationBooks";
import { CarouselBooks } from "@/components/component/CarouselBooks";
import { useFetchHomeBook } from "@/features/book/useFetchHomeBook";
import { useRouter } from "next/router";

export function Homepage() {
  const router = useRouter();
  const {
    data: upcomingbooks,
    isLoading: upcomingbooksLoading,
    error: upcomingbooksError,
  } = useFetchUpcomingBooks();

  const {
    data: recomendationbooks,
    isLoading: recomendationbooksLoading,
    error: recomendationbooksError,
  } = useFetchRecomendationBooks();

  const {
    data: homebooks,
    isLoading: homebooksLoading,
    error: homebooksError,
  } = useFetchHomeBook();

  if (upcomingbooksLoading) return <div>Loading...</div>;
  if (upcomingbooksError)
    return <div>An error occurred: {upcomingbooksError.message}</div>;
  if (recomendationbooksLoading) return <div>Loading...</div>;
  if (recomendationbooksError)
    return <div>An error occurred: {recomendationbooksError.message}</div>;
  if (homebooksLoading) return <div>Loading...</div>;
  if (homebooksError)
    return <div>An error occurred: {homebooksError.message}</div>;

  const review = homebooks.bookreview[0];
  const rating = homebooks.bookrating[0];

  const handlerClickBook = (book) => {
    const letter = book.title.charAt(0).toLowerCase();
    router.push(`/books/${letter}/${book.id}`);
  };

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        <section className="w-full py-6 sm:py-12 lg:py-16">
          <div className="container grid grid-cols-1 gap-4 px-4 mx-auto sm:grid-cols-2 sm:gap-8 lg:gap-12">
            <div className="flex flex-col items-start justify-center space-y-4">
              <div className="inline-block px-3 py-1 rounded-lg text-md bg-primary text-primary-foreground">
                Featured reviews
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {review?.title}
              </h1>
              <p className="text-muted-foreground md:text-xl">
                by {review?.author}.
              </p>
              <div className="flex space-x-4">
                <Button onClick={() => handlerClickBook(review)}>
                  View book
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={review?.book_image_url}
                width={400}
                height={600}
                alt="The Great Gatsby"
                className="object-cover rounded-xl"
                style={{ aspectRatio: "400/600", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
        <section className="w-full py-6 sm:py-12 lg:py-16">
          <div className="container grid grid-cols-1 gap-4 px-4 mx-auto sm:grid-cols-2 sm:gap-8 lg:gap-12">
            <div className="flex flex-col items-end justify-center order-first space-y-4 text-end sm:order-last">
              <div className="inline-block px-3 py-1 rounded-lg text-md bg-primary text-primary-foreground">
                Featured rating
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {rating?.title}
              </h1>
              <p className="text-muted-foreground md:text-xl">
                by {rating?.author}.
              </p>
              <div className="flex space-x-4">
                <Button onClick={() => handlerClickBook(rating)}>
                  View book
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center order-last sm:order-first">
              <img
                src={rating?.book_image_url}
                width={400}
                height={600}
                alt="The Great Gatsby"
                className="object-cover rounded-xl"
                style={{ aspectRatio: "400/600", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
        <section id="recomendation-section">
          <CarouselBooks
            books={recomendationbooks}
            title="Recomended Books"
            isLoading={recomendationbooksLoading}
            error={recomendationbooksError}
          />
        </section>
        <CarouselBooks
          books={upcomingbooks}
          title="Upcoming Books"
          isLoading={upcomingbooksLoading}
          error={upcomingbooksError}
        />
      </main>
    </div>
  );
}
