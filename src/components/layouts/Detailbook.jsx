import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/component/Rating";
import { BookDetails } from "@/components/component/BookDetails";
import { ReviewForm } from "@/components/component/Review";
import { ReviewList } from "@/components/component/Reviewlist";
import { useAddBookRatingById } from "@/features/book/rating/useAddBookRatingById";
import { useDeleteBookRatingById } from "@/features/book/rating/useDeleteBookRatingById";
import { useAuth } from "@/features/auth/AuthContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePostAuth } from "@/features/auth/UsePostAuth";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";

export function Detailbook({ bookData, reviews }) {
  const {
    id,
    title,
    published,
    author,
    genre,
    format,
    isbn,
    description,
    bookURL,
    book_image_url,
    ratingtotal,
    ratingcount,
  } = bookData;

  const mutation = usePostAuth();
  const { userData, isLoggedIn, login } = useAuth();
  const [loginFailed, setLoginFailed] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);

  const addBookRatingMutation = useAddBookRatingById();
  const deleteBookRatingMutation = useDeleteBookRatingById();

  const handleOpenRatingModal = () => setShowRatingModal(true);
  const handleCloseRatingModal = () => setShowRatingModal(false);

  const handleOpenLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    setLoginFailed("");
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setLoginFailed("");
    const username = event.target.username.value;
    const password = event.target.password.value;
    try {
      const response = await mutation.mutateAsync({ username, password });
      login(response.data.accessToken);
      handleCloseLoginModal();
    } catch (error) {
      setLoginFailed("Username or Password is incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRatingSubmit = async () => {
    try {
      await addBookRatingMutation.mutateAsync({
        bookId: id,
        rating: currentRating,
      });
      handleCloseRatingModal();
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const handleRemoveRating = async () => {
    try {
      await deleteBookRatingMutation.mutateAsync({
        bookId: id,
      });
      handleCloseRatingModal();
    } catch (error) {
      console.error("Error removing rating:", error);
    }
  };

  const hasUserReviewed =
    isLoggedIn && reviews.some((review) => review.user_id === userData?.id);

  return (
    <div className="max-w-5xl px-4 py-12 mx-auto md:px-6">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={book_image_url}
            alt="Book Cover"
            width={400}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg object-fit"
            style={{ aspectRatio: "400/600" }}
          />
        </div>
        <BookDetails
          title={title}
          author={author}
          description={description}
          published={published}
          genre={genre}
          format={format}
          isbn={isbn}
        />
      </div>
      <div className="items-center gap-2 m-8 ml-0 mr-0">
        <div className="flex gap-2">
          <StarRating
            rating={parseFloat(ratingtotal).toFixed(1)}
            onRatingChange={() => {}}
            active={false}
          />
          <p className="mt-1 text-lg">({ratingcount})</p>
        </div>
        {isLoggedIn ? (
          <Button
            className="mt-3"
            variant="outline"
            onClick={handleOpenRatingModal}
          >
            Rate this book
          </Button>
        ) : (
          <Button
            className="mt-3"
            variant="outline"
            onClick={handleOpenLoginModal}
          >
            Rate this book
          </Button>
        )}
      </div>
      <Dialog open={showRatingModal} onOpenChange={handleCloseRatingModal}>
        <DialogContent className="sm:max-w-[425px] max-w-[350px]">
          <DialogTitle>Rate this book</DialogTitle>
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <StarRating
              rating={currentRating}
              onRatingChange={setCurrentRating}
              active={true}
            />
            <DialogDescription></DialogDescription>
            <div className="flex flex-col justify-end w-full gap-2">
              <Button
                onClick={handleRatingSubmit}
                disabled={addBookRatingMutation.isLoading}
              >
                {addBookRatingMutation.isLoading ? "Submitting..." : "Submit"}
              </Button>
              <Button variant="ghost" onClick={handleRemoveRating}>
                Remove rating
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={showLoginModal} onOpenChange={handleCloseLoginModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login to rate this book</DialogTitle>
            <DialogDescription>
              Enter your username and password to access your account.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="JohnDoe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="**********"
              />
            </div>
            {loginFailed && (
              <p className="text-sm text-red-500">{loginFailed}</p>
            )}
            <DialogFooter>
              <div className="flex flex-row justify-end w-full gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseLoginModal}
                >
                  Cancel
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="mt-8">
        {isLoggedIn ? (
          !hasUserReviewed ? (
            <>
              <h2 className="mb-4 text-2xl font-bold">Write a Review</h2>
              <ReviewForm bookId={id} />
            </>
          ) : (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Your Review</h2>
              <ReviewList
                mine={true}
                id={id}
                reviews={reviews.filter(
                  (review) => review.user_id === userData.id
                )}
              />
            </div>
          )
        ) : (
          <p className="text-lg">
            Please log in to write a review or see your review.
          </p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}
