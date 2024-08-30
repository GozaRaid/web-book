import { useRouter } from "next/router";
import { Detailbook } from "@/components/layouts/Detailbook";
import { useFetchBookById } from "@/features/book/useFetchBookById";
import { useFetchBookReviewById } from "@/features/book/review/useFetchBookReviewById";

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: bookData,
    isLoading: isLoadingBook,
    error: bookError,
  } = useFetchBookById(id);

  const {
    data: reviews,
    isLoading: isLoadingReviews,
    error: reviewsError,
  } = useFetchBookReviewById(id);

  if (router.isFallback || !id) {
    return <div>Loading...</div>;
  }

  if (isLoadingBook || isLoadingReviews) {
    return <div>Loading...</div>;
  }

  if (bookError) {
    return <div>Error loading book: {bookError.message}</div>;
  }

  if (reviewsError) {
    return <div>Error loading reviews: {reviewsError.message}</div>;
  }

  if (!bookData) {
    return <div>No book data available</div>;
  }

  return <Detailbook bookData={bookData} reviews={reviews} />;
}
