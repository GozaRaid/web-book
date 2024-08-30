import { useState, useRef, useEffect } from "react";

export const BookDetails = ({
  title,
  author,
  description,
  published,
  genre,
  format,
  isbn,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const descriptionHeight = descriptionRef.current.scrollHeight;
    const lineHeight = parseFloat(
      getComputedStyle(descriptionRef.current).lineHeight
    );
    const clampHeight = lineHeight * 5;

    if (descriptionHeight > clampHeight) {
      setShowButton(true);
    }
  }, [description]);

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">{title}</h1>
      <p className="mb-4 text-lg text-muted-foreground">by {author}</p>

      <div className="grid grid-cols-2 mb-2 text-sm leading-relaxed gap-y-2 text-muted-foreground">
        <p className="font-medium">Publication</p>
        <p className="font-bold text-black">{published}</p>
        <p className="font-medium">Format</p>
        <p className="font-bold text-black">{format}</p>
        <p className="font-medium">Genre</p>
        <p className="font-bold text-black">{genre}</p>
        <p className="font-medium">ISBN</p>
        <p className="font-bold text-black">{isbn}</p>
      </div>

      <p
        ref={descriptionRef}
        className={`mb-2 text-sm leading-relaxed ${
          isExpanded ? "" : "line-clamp-5"
        }`}
      >
        {description}
      </p>
      {showButton && (
        <button
          className="flex items-center text-primary hover:underline focus:outline-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Read Less" : "Read More"}
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      )}
    </div>
  );
};

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
