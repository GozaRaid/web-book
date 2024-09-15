import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDeleteAuth } from "@/features/auth/UseDeleteAuth";

export function Navbar() {
  const { isLoggedIn, userData, logout } = useAuth();
  const router = useRouter();

  const deleteAuthMutation = useDeleteAuth();

  const handleLogout = async () => {
    try {
      await deleteAuthMutation.mutateAsync();
      logout();
    } catch (error) {}
  };

  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    router.push(`/search?search=${query}`);
  };

  return (
    <div className="bg-muted">
      <div className="container flex items-center h-20 p-0 mx-auto">
        <Link href="/" className="m-4 lg:flex" prefetch={false}>
          <BookOpenIcon className="w-6 h-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link href="/" className="group button-custom" prefetch={false}>
                Home
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="/books"
                className="group button-custom"
                prefetch={false}
              >
                Book List
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="/#recomendation-section"
                className="group button-custom"
                prefetch={false}
              >
                Recomendation
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              {userData?.role === "admin" && (
                <Link
                  href="/admin/book/create"
                  className="group button-custom"
                  prefetch={false}
                >
                  Add Book
                </Link>
              )}
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
        <form
          onSubmit={handleSearch}
          className="relative flex-1 ml-auto md:grow-0"
        >
          <Input
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Search for books"
            className="w-full rounded-lg bg-background pl-9 md:w-[336px]"
          />
          <button type="submit" className="absolute w-4 h-4 left-3 top-3">
            <Image
              src="/magnifying-glass-solid.svg"
              width={16}
              height={16}
              alt="search icon"
            />
          </button>
        </form>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="mx-2 lg:hidden">
              <SheetTitle>
                <MenuIcon className="w-5 h-5" />
              </SheetTitle>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="flex flex-col gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center justify-center w-10 h-10 gap-2 text-lg font-semibold rounded-full group shrink-0 bg-primary text-primary-foreground md:text-base"
                prefetch={false}
              >
                <BookOpenIcon className="w-5 h-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <div className="flex justify-center mt-3">
                <SheetDescription />
                <NavigationMenu>
                  <NavigationMenuList className="flex-col items-center w-full gap-2">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/"
                        className="group button-custom-mobile "
                        prefetch={false}
                      >
                        Home
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/books"
                        className="group button-custom-mobile"
                        prefetch={false}
                      >
                        Book List
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/#recomendation"
                        className="group button-custom-mobile"
                        prefetch={false}
                      >
                        Recomendation
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      {userData?.role === "admin" && (
                        <Link
                          href="/admin/book/create"
                          className="group button-custom-mobile"
                          prefetch={false}
                        >
                          Add Book
                        </Link>
                      )}
                    </NavigationMenuLink>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              {!isLoggedIn && (
                <>
                  <Link href="/auth/login">
                    <Button variant="outline" className="w-full">
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="mx-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="w-8 h-8 border-2">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5 leading-none">
                  <div className="font-semibold">{userData.displayname}</div>
                  <div className="text-sm text-muted-foreground">
                    {userData.email}
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href="#"
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <div className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="#"
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <div className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <div className="w-4 h-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="hidden mx-4 lg:block">
            <div className="flex gap-2">
              <Link href="/auth/login">
                <Button className="hidden lg:block" variant="outline">
                  Sign in
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="hidden lg:block">Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
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

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
