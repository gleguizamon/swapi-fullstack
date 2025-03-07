"use client";
import { useState, useMemo } from "react";
import { SearchFilter } from "@/components/search-filter";
import { Pagination } from "@/components/pagination";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  includes,
  propEq,
  toLower,
  filter as rFilter,
} from "@/node_modules/@types/ramda";
import type { Planet } from "@/lib/api";

type Props = {
  planets: Planet[];
  count: number;
  initialPage: number;
};

export default function PlanetsList({ planets, count, initialPage }: Props) {
  const [page, setPage] = useState(initialPage);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
        result
      );
    }

    return result;
  }, [planets, filter, searchQuery]);

  return (
    <div>
      <SearchFilter
        onSearch={setSearchQuery}
        onFilter={setFilter}
        filterOptions={filterOptions}
        placeholder="Search planets..."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPlanets.map((planet) => (
          <Card
            key={planet.id}
            className="overflow-hidden transition-all hover:shadow-lg"
          >
            <div className="relative aspect-square">
              <Image
                src={planet.image || "/placeholder.svg"}
                alt={planet.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <FavoriteButton
                  id={planet.id}
                  type="planet"
                  name={planet.name}
                  image={planet.image}
                />
              </div>
            </div>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold">{planet.name}</h2>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Climate:</span> {planet.climate}
                </div>
                <div>
                  <span className="font-medium">Terrain:</span> {planet.terrain}
                </div>
                <div>
                  <span className="font-medium">Diameter:</span>{" "}
                  {planet.diameter}km
                </div>
                <div>
                  <span className="font-medium">Population:</span>{" "}
                  {planet.population}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link
                href={`/planets/${planet.id}`}
                className="text-primary hover:underline"
              >
                View Details
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(count / 10)}
        basePath="/planets"
      />
    </div>
  );
}
