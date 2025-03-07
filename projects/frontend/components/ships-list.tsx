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
import type { Ship } from "@/lib/api";

type Props = {
  ships: Ship[];
  count: number;
  initialPage: number;
};

export default function ShipsList({
  ships,
  count,
  initialPage,
  nextPage,
  previousPage,
}: Props) {
  const [page, setPage] = useState(initialPage);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Starfighter", value: "starfighter" },
    { label: "Transport", value: "transport" },
    { label: "Star Destroyer", value: "star destroyer" },
  ];

  const filteredShips = useMemo(() => {
    let result =
      filter === "all"
        ? ships
        : rFilter(propEq(filter, "starship_class"), ships);

    if (searchQuery.trim() !== "") {
      result = rFilter(
        (ship) => includes(toLower(searchQuery), toLower(ship.name)),
        result
      );
    }

    return result;
  }, [ships, filter, searchQuery]);

  return (
    <div>
      <SearchFilter
        onSearch={setSearchQuery}
        onFilter={setFilter}
        filterOptions={filterOptions}
        placeholder="Search ships..."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredShips.map((ship, index) => (
          <Card
            key={index}
            className="overflow-hidden transition-all hover:shadow-lg"
          >
            <div className="relative aspect-video">
              <Image
                src={ship.image || "/placeholder.svg"}
                alt={ship.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <FavoriteButton
                  id={ship.id}
                  type="ship"
                  name={ship.name}
                  image={ship.image}
                />
              </div>
            </div>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold">{ship.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{ship.model}</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Class:</span>{" "}
                  {ship.starship_class}
                </div>
                <div>
                  <span className="font-medium">Length:</span> {ship.length}m
                </div>
                <div>
                  <span className="font-medium">Crew:</span> {ship.crew}
                </div>
                <div>
                  <span className="font-medium">Passengers:</span>{" "}
                  {ship.passengers}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link
                href={`/ships/${ship.id}`}
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
        basePath="/ships"
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
}
