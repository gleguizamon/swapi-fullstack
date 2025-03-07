"use client";
import { useMemo, useState } from "react";
import { SearchFilter } from "@/components/search-filter";
import { Pagination } from "@/components/pagination";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Character } from "@/lib/api";
import {
  includes,
  propEq,
  toLower,
  filter as rFilter,
} from "@/node_modules/@types/ramda";

export default function CharactersList({
  characters,
  count,
  initialPage,
}: {
  characters: Character[];
  count: number;
  initialPage: number;
}) {
  const [page, setPage] = useState(initialPage);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const totalPages = Math.ceil(count / 10);

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
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
            className="overflow-hidden transition-all hover:shadow-lg"
          >
            <div className="relative aspect-square">
              <Image
                src={character.image || "/placeholder.svg"}
                alt={character.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <FavoriteButton
                  id={character.id}
                  type="character"
                  name={character.name}
                  image={character.image}
                />
              </div>
            </div>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold">{character.name}</h2>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Gender:</span>{" "}
                  {character.gender}
                </div>
                <div>
                  <span className="font-medium">Birth Year:</span>{" "}
                  {character.birth_year}
                </div>
                <div>
                  <span className="font-medium">Height:</span>{" "}
                  {character.height}cm
                </div>
                <div>
                  <span className="font-medium">Mass:</span> {character.mass}kg
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
      />
    </div>
  );
}
