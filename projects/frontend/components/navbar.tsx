"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Heart, Menu, Star } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const categories = [
  { name: "Inicio", href: "/" },
  { name: "Personajes", href: "/characters" },
  { name: "Películas", href: "/movies" },
  { name: "Naves", href: "/ships" },
  { name: "Planetas", href: "/planets" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 md:px-6 flex h-16 items-center mx-auto">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav pathname={pathname} setOpen={setOpen} />
          </SheetContent>
        </Sheet>
        <nav className="hidden md:flex items-center w-full justify-between">
          <div className="flex items-center space-x-4 lg:space-x-6">
            {categories.map((category) => {
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className={cn(
                    "flex text-sm justify-center font-medium transition-colors hover:text-primary",
                    pathname.startsWith(category.href)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
          <div className="flex">
            <Link
              href="/favorites"
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathname === "/favorites"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5 dark:text-white text-black" />
                <span className="sr-only">Favorites</span>
              </Button>
            </Link>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

function MobileNav({
  pathname,
  setOpen,
}: {
  pathname: string;
  setOpen: (open: boolean) => void;
}) {
  return (
    <div className="flex flex-col space-y-3 px-2 py-4">
      <Link
        href="/"
        className="flex items-center space-x-2"
        onClick={() => setOpen(false)}
      >
        <Star className="h-6 w-6 text-primary" />
        <span className="font-bold">Star Wars Explorer</span>
      </Link>
      <div className="flex flex-col space-y-3 pt-6">
        {categories.map((category) => {
          return (
            <Link
              key={category.href}
              href={category.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname.startsWith(category.href) ? "bg-accent" : "transparent"
              )}
            >
              {category.name}
            </Link>
          );
        })}
        <Link
          href="/favorites"
          onClick={() => setOpen(false)}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === "/favorites" ? "bg-accent" : "transparent"
          )}
        >
          <Heart className="mr-2 h-4 w-4" />
          Favorites
        </Link>
      </div>
    </div>
  );
}
