export const StarRating = ({ rating, onRatingChange, active }) => {
  // Clamp rating between 0 and 5
  const clampedRating = Math.max(0, Math.min(5, rating));

  // Calculate the number of full, half, and empty stars
  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating % 1 !== 0;
  const emptyStars = Math.max(0, 5 - Math.ceil(clampedRating));

  return (
    <div className="flex items-center gap-2">
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon
          key={`full-${index}`}
          className={`w-8 h-8 ${active ? "cursor-pointer" : ""} fill-primary`}
          onClick={() => active && onRatingChange(index + 1)}
        />
      ))}

      {/* Render half star if needed */}
      {hasHalfStar && (
        <StarIcon
          key="half-star"
          className={`w-8 h-8 ${active ? "cursor-pointer" : ""} fill-primary`}
          style={{ clipPath: "inset(0 50% 0 0)" }}
          onClick={() => active && onRatingChange(fullStars + 0.5)}
        />
      )}

      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <StarIcon
          key={`empty-${index}`}
          className={`w-8 h-8 ${
            active ? "cursor-pointer" : ""
          } fill-muted stroke-muted-foreground`}
          onClick={() =>
            active && onRatingChange(fullStars + hasHalfStar + index + 1)
          }
        />
      ))}

      {/* Display the rating */}
      <span className="text-lg font-semibold">{clampedRating} / 5</span>
    </div>
  );
};

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
