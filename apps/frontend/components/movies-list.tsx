"use client";
import { useState, useMemo, useEffect } from "react";
import { SearchFilter } from "@/components/search-filter";
import { Pagination } from "@/components/pagination";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { filter as rFilter, propEq, includes, toLower } from "ramda";
import type { Movie } from "@/lib/api";

type Props = {
  movies: Movie[];
  nextPage: string | null;
  previousPage: string | null;
};

export default function MoviesList({ movies, nextPage, previousPage }: Props) {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setPage(1);
  }, []);

  const totalPages = Math.ceil(movies.length / 10);

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
            className="transition-all hover:shadow-lg border-l-4 border-l-primary"
          >
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2">
                Episode {movie.episode_id}: {movie.title}
              </h2>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-muted-foreground">
                  Released: {new Date(movie.release_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Director: {movie.director}
                </p>
              </div>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {movie.opening_crawl}
              </p>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
              <Link
                href={`/movies/${movie.id}`}
                className="text-primary hover:underline font-medium"
              >
                View Details
              </Link>
              <FavoriteButton
                id={movie.id}
                type="movie"
                name={movie.title}
                image={movie.image}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/movies"
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
}
