import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAddBookReviewById } from "@/features/book/review/useAddBookReviewById";

export const ReviewForm = ({
  bookId,
  // onReviewAdded
}) => {
  const [text, setText] = useState("");
  const addBookReviewMutation = useAddBookReviewById();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text) {
      try {
        await addBookReviewMutation.mutateAsync({ bookId, review: text });
        setText("");
        // onReviewAdded();
      } catch (error) {
        console.error("Failed to submit review:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="text">Review</Label>
        <Textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Share your thoughts on the book"
          required
        />
      </div>
      <Button type="submit" disabled={addBookReviewMutation.isLoading}>
        {addBookReviewMutation.isLoading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};
