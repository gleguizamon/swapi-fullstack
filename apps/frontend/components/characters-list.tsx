"use client";
import { useMemo, useState, useEffect } from "react";
import { SearchFilter } from "@/components/search-filter";
import { Pagination } from "@/components/pagination";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Character } from "@/lib/api";
import { includes, propEq, toLower, filter as rFilter } from "ramda";

type Props = {
  characters: Character[];
  count: number;
  initialPage: number;
  nextPage: string | null;
  previousPage: string | null;
};

export default function CharactersList({
  characters,
  count,
  initialPage,
  nextPage,
  previousPage,
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
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "n/a" },
  ];

  const filteredCharacters = useMemo(() => {
    let result =
      filter === "all"
        ? characters
        : rFilter(propEq(filter, "gender"), characters);

    if (searchQuery.trim() !== "") {
      result = rFilter(
        (character) => includes(toLower(searchQuery), toLower(character.name)),
        result
      );
    }

    return result;
  }, [characters, filter, searchQuery]);

  return (
    <div>
      <div className="mb-8">
        <SearchFilter
          onSearch={setSearchQuery}
          onFilter={setFilter}
          filterOptions={filterOptions}
          placeholder="Search characters..."
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCharacters.map((character) => (
          <Card
            key={character.id}
            className="overflow-hidden transition-all hover:shadow-lg border-l-4 border-l-primary"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">{character.name}</h2>
                <FavoriteButton
                  id={character.id}
                  type="character"
                  name={character.name}
                  image={character.image}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-2 bg-muted rounded">
                  <span className="font-medium block mb-1">Gender</span>
                  {character.gender}
                </div>
                <div className="p-2 bg-muted rounded">
                  <span className="font-medium block mb-1">Birth Year</span>
                  {character.birth_year}
                </div>
                <div className="p-2 bg-muted rounded">
                  <span className="font-medium block mb-1">Height</span>
                  {character.height}cm
                </div>
                <div className="p-2 bg-muted rounded">
                  <span className="font-medium block mb-1">Mass</span>
                  {character.mass}kg
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link
                href={`/characters/${character.id}`}
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
        basePath="/characters"
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
}
