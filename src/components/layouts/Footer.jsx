import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-6 bg-muted">
      <div className="container flex flex-col items-center gap-4 max-w-7xl sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <BookOpenIcon className="w-6 h-6" />
          <span className="text-sm font-medium">Book Reviews</span>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Book Reviews. All rights reserved.
        </p>
        <div className="flex gap-4 text-xs">
          <Link href="#" className="hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

function BookOpenIcon(props) {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
