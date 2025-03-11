"use client";
import { useState, useMemo, useEffect } from "react";
import { SearchFilter } from "@/components/search-filter";
import { Pagination } from "@/components/pagination";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { includes, propEq, toLower, filter as rFilter } from "ramda";
import type { Planet } from "@repo/shared-types";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { extractIdFromUrl } from "@/utils/extractIdFromUrl";

type Props = {
  planets: Planet[];
  initialPage: number;
  nextPage: string | null;
  previousPage: string | null;
  count: number;
};

export default function PlanetsList({
  planets,
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
    { label: "Arid", value: "arid" },
    { label: "Temperate", value: "temperate" },
    { label: "Tropical", value: "tropical" },
    { label: "Frozen", value: "frozen" },
  ];

  const filteredPlanets = useMemo(() => {
    let result =
      filter === "all" ? planets : rFilter(propEq(filter, "climate"), planets);

    if (searchQuery.trim() !== "") {
      result = rFilter(
        (planet) => includes(toLower(searchQuery), toLower(planet.name)),
        result,
      );
    }

    return result;
  }, [planets, filter, searchQuery]);

  return (
    <div>
      <div className="mb-8">
        <SearchFilter
          onSearch={setSearchQuery}
          onFilter={setFilter}
          filterOptions={filterOptions}
          placeholder="Buscar planetas..."
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPlanets.map((planet) => (
          <Card
            key={extractIdFromUrl(planet.url)}
            className="overflow-hidden transition-all hover:shadow-lg border-l-4 border-l-primary"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">{planet.name}</h2>
                <FavoriteButton
                  id={extractIdFromUrl(planet.url)}
                  type="planet"
                  name={planet.name}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-2 bg-muted rounded">
                  <span className="font-medium block mb-1">Climate</span>
                  {planet.climate}
                </div>
                <div className="p-2 bg-muted rounded">
                  <span className="font-medium block mb-1">Terrain</span>
                  {planet.terrain}
                </div>
                <div className="p-2 bg-muted rounded">
                  <span className="font-medium block mb-1">Diameter</span>
                  {planet.diameter}km
                </div>
                <div className="p-2 bg-muted rounded">
                  <span className="font-medium block mb-1">Population</span>
                  {planet.population}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link
                href={`/planets/${extractIdFromUrl(planet.url)}`}
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
        basePath="/planets"
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
}
