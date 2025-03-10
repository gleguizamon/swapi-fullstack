"use client";
import { useState, useMemo, useEffect } from "react";
import { SearchFilter } from "@/components/search-filter";
import { Pagination } from "@/components/pagination";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { includes, propEq, toLower, filter as rFilter } from "ramda";
import type { Ship } from "@/lib/api";

type Props = {
  ships: Ship[];
  count: number;
  initialPage: number;
  nextPage: string | null;
  previousPage: string | null;
};

export default function ShipsList({
  ships,
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
      <div className="mb-8">
        <SearchFilter
          onSearch={setSearchQuery}
          onFilter={setFilter}
          filterOptions={filterOptions}
          placeholder="Search ships..."
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredShips.map((ship, index) => (
          <Card
            key={index}
            className="overflow-hidden transition-all hover:shadow-lg border-l-4 border-l-primary"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">{ship.name}</h2>
                <FavoriteButton
                  id={ship.id}
                  type="ship"
                  name={ship.name}
                  image={ship.image}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1">{ship.model}</p>
              <div className="grid grid-cols-2 gap-3 text-sm mt-4">
                <div className="p-2 bg-muted rounded">
                  <span className="font-medium block mb-1">Class</span>
                  {ship.starship_class}
                </div>
                <div className="p-2 bg-muted rounded">
                  <span className="font-medium block mb-1">Length</span>
                  {ship.length}m
                </div>
                <div className="p-2 bg-muted rounded">
                  <span className="font-medium block mb-1">Crew</span>
                  {ship.crew}
                </div>
                <div className="p-2 bg-muted rounded">
                  <span className="font-medium block mb-1">Passengers</span>
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
        totalPages={totalPages}
        basePath="/ships"
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
}
