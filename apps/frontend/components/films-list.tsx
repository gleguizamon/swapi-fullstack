"use client";
import { useState, useMemo, useEffect } from "react";
import { SearchFilter } from "@/components/search-filter";
import { Pagination } from "@/components/pagination";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { filter as rFilter, propEq, includes, toLower } from "ramda";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Film } from "@repo/shared-types";

type Props = {
  films: Film[];
  nextPage: string | null;
  previousPage: string | null;
};

export default function FilmsList({ films, nextPage, previousPage }: Props) {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setPage(1);
  }, []);

  const totalPages = Math.ceil(films.length / 10);

  const sortedFilms = films.sort((a, b) => a.episode_id - b.episode_id);

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "George Lucas", value: "George Lucas" },
    { label: "Irvin Kershner", value: "Irvin Kershner" },
    { label: "Richard Marquand", value: "Richard Marquand" },
  ];

  const filteredFilms = useMemo(() => {
    let result =
      filter === "all"
        ? sortedFilms
        : rFilter(propEq(filter, "director"), sortedFilms);

    if (searchQuery.trim() !== "") {
      result = rFilter(
        (film) => includes(toLower(searchQuery), toLower(film.title)),
        result,
      );
    }

    return result;
  }, [sortedFilms, filter, searchQuery]);

  return (
    <div>
      <div className="mb-8">
        <SearchFilter
          onSearch={setSearchQuery}
          onFilter={setFilter}
          filterOptions={filterOptions}
          placeholder="Buscar películas..."
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredFilms.map((film) => (
          <Card
            key={film.id}
            className="transition-all hover:shadow-lg border-l-4 border-l-primary"
          >
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2">
                Episode {film.episode_id}: {film.title}
              </h2>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-muted-foreground">
                  Released: {new Date(film.release_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Director: {film.director}
                </p>
              </div>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {film.opening_crawl}
              </p>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
              <Link
                href={`/films/${film.id}`}
                className="text-primary hover:underline"
              >
                <Button variant="outline" size="sm" className="cursor-pointer">
                  Ver detalles <ArrowRight />
                </Button>
              </Link>
              <FavoriteButton id={film.id} type="film" name={film.title} />
            </CardFooter>
          </Card>
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/films"
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
}
