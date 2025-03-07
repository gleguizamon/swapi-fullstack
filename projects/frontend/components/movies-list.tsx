"use client";
import { useState, useMemo } from "react";
import { SearchFilter } from "@/components/search-filter";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  filter as rFilter,
  propEq,
  includes,
  toLower,
} from "@/node_modules/@types/ramda";
import type { Movie } from "@/lib/api";

export default function MoviesList({ movies }: { movies: Movie[] }) {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sortedMovies = movies.sort((a, b) => a.episode_id - b.episode_id);

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "George Lucas", value: "George Lucas" },
    { label: "Irvin Kershner", value: "Irvin Kershner" },
    { label: "Richard Marquand", value: "Richard Marquand" },
  ];

  const filteredMovies = useMemo(() => {
    let result =
      filter === "all"
        ? sortedMovies
        : rFilter(propEq(filter, "director"), sortedMovies);

    if (searchQuery.trim() !== "") {
      result = rFilter(
        (movie) => includes(toLower(searchQuery), toLower(movie.title)),
        result
      );
    }

    return result;
  }, [sortedMovies, filter, searchQuery]);

  return (
    <div>
      <div className="mb-8">
        <SearchFilter
          onSearch={setSearchQuery}
          onFilter={setFilter}
          filterOptions={filterOptions}
          placeholder="Search movies..."
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMovies.map((movie) => (
          <Card
            key={movie.id}
            className="overflow-hidden transition-all hover:shadow-lg"
          >
            <div className="relative aspect-[2/3]">
              <Image
                src={movie.image || "/placeholder.svg"}
                alt={movie.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <FavoriteButton
                  id={movie.id}
                  type="movie"
                  name={movie.title}
                  image={movie.image}
                />
              </div>
            </div>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold">
                Episode {movie.episode_id}: {movie.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Released: {new Date(movie.release_date).toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Director: {movie.director}
              </p>
              <p className="mt-4 line-clamp-3 text-sm">{movie.opening_crawl}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link
                href={`/movies/${movie.id}`}
                className="text-primary hover:underline"
              >
                View Details
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
