"use client";
import { useState, useMemo, useEffect } from "react";
import { SearchFilter } from "@/components/search-filter";
import { Pagination } from "@/components/pagination";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { includes, propEq, toLower, filter as rFilter } from "ramda";
import type { Starship } from "@repo/shared-types";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { extractIdFromUrl } from "@/utils/extractIdFromUrl";

type Props = {
  starships: Starship[];
  count: number;
  initialPage: number;
  nextPage: string | null;
  previousPage: string | null;
};

export default function StarshipsList({
  starships,
  initialPage,
  nextPage,
  previousPage,
  count,
}: Props) {
  const [page, setPage] = useState(initialPage);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  const totalPages = Math.ceil(count / 10);

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Starfighter", value: "starfighter" },
    { label: "Transport", value: "transport" },
    { label: "Star Destroyer", value: "star destroyer" },
  ];

  const filteredStarship = useMemo(() => {
    let result =
      filter === "all"
        ? starships
        : rFilter(propEq(filter, "starship_class"), starships);

    if (searchQuery.trim() !== "") {
      result = rFilter(
        (starship) => includes(toLower(searchQuery), toLower(starship.name)),
        result,
      );
    }

    return result;
  }, [starships, filter, searchQuery]);

  return (
    <div>
      <div className="mb-8">
        <SearchFilter
          onSearch={setSearchQuery}
          onFilter={setFilter}
          filterOptions={filterOptions}
          placeholder="Buscar naves..."
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredStarship.map((starship) => (
          <Card
            key={extractIdFromUrl(starship.url)}
            className="overflow-hidden transition-all hover:shadow-lg border-l-4 border-l-primary"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold">{starship.name}</h2>
                <FavoriteButton
                  id={extractIdFromUrl(starship.url)}
                  type="starship"
                  name={starship.name}
                />
              </div>
              <p className="text-sm text-muted-foreground">{starship.model}</p>
              <div className="grid grid-cols-2 gap-3 text-sm mt-4">
                <div className="p-2 bg-muted rounded">
                  <span className="font-medium block mb-1">Class</span>
                  {starship.starship_class}
                </div>
                <div className="p-2 bg-muted rounded">
                  <span className="font-medium block mb-1">Length</span>
                  {starship.length}m
                </div>
                <div className="p-2 bg-muted rounded">
                  <span className="font-medium block mb-1">Crew</span>
                  {starship.crew}
                </div>
                <div className="p-2 bg-muted rounded">
                  <span className="font-medium block mb-1">Passengers</span>
                  {starship.passengers}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link
                href={`/starships/${extractIdFromUrl(starship.url)}`}
                className="text-primary hover:underline"
              >
                <Button variant="outline" size="sm" className="cursor-pointer">
                  Ver detalles <ArrowRight />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/starships"
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
}
