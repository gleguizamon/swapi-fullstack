"use client";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Film, Globe, Rocket, Users } from "lucide-react";
import { useFavorites } from "@/components/favorites-provider";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function ComparePage() {
  const { favorites } = useFavorites();
  const [selectedTab, setSelectedTab] = useState("characters");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Group favorites by type
  const characters = favorites.filter((item) => item.type === "character");
  const movies = favorites.filter((item) => item.type === "movie");
  const ships = favorites.filter((item) => item.type === "ship");
  const planets = favorites.filter((item) => item.type === "planet");

  // Get items to display based on selected tab
  const getItemsForType = () => {
    switch (selectedTab) {
      case "characters":
        return characters;
      case "movies":
        return movies;
      case "ships":
        return ships;
      case "planets":
        return planets;
      default:
        return [];
    }
  };

  const itemsForType = getItemsForType();

  // Get selected items details
  const selectedItemsDetails = itemsForType.filter((item) =>
    selectedItems.includes(item.id)
  );

  // Handle item selection
  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      if (selectedItems.length < 3) {
        setSelectedItems([...selectedItems, id]);
      }
    }
  };

  // Clear selections
  const clearSelections = () => {
    setSelectedItems([]);
  };

  // Get comparison fields based on type
  const getComparisonFields = () => {
    switch (selectedTab) {
      case "characters":
        return [
          { label: "Height", key: "height", unit: "cm" },
          { label: "Mass", key: "mass", unit: "kg" },
          { label: "Hair Color", key: "hair_color" },
          { label: "Eye Color", key: "eye_color" },
          { label: "Birth Year", key: "birth_year" },
          { label: "Gender", key: "gender" },
        ];
      case "movies":
        return [
          { label: "Episode", key: "episode_id" },
          { label: "Director", key: "director" },
          { label: "Producer", key: "producer" },
          { label: "Release Date", key: "release_date" },
          { label: "Characters Count", key: "characters_count" },
          { label: "Planets Count", key: "planets_count" },
        ];
      case "ships":
        return [
          { label: "Model", key: "model" },
          { label: "Manufacturer", key: "manufacturer" },
          { label: "Cost", key: "cost_in_credits", unit: "credits" },
          { label: "Length", key: "length", unit: "m" },
          { label: "Crew", key: "crew" },
          { label: "Passengers", key: "passengers" },
          { label: "Cargo Capacity", key: "cargo_capacity", unit: "kg" },
          { label: "Max Speed", key: "max_atmosphering_speed" },
          { label: "Hyperdrive Rating", key: "hyperdrive_rating" },
        ];
      case "planets":
        return [
          { label: "Climate", key: "climate" },
          { label: "Terrain", key: "terrain" },
          { label: "Diameter", key: "diameter", unit: "km" },
          { label: "Gravity", key: "gravity" },
          { label: "Rotation Period", key: "rotation_period", unit: "hours" },
          { label: "Orbital Period", key: "orbital_period", unit: "days" },
          { label: "Surface Water", key: "surface_water", unit: "%" },
          { label: "Population", key: "population" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="px-6 py-6">
      <h1 className="text-3xl font-bold mb-8">Compare Items</h1>

      <Tabs
        defaultValue="characters"
        value={selectedTab}
        onValueChange={(value) => {
          setSelectedTab(value);
          setSelectedItems([]);
        }}
        className="mb-8"
      >
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="characters" disabled={characters.length < 2}>
            <Users className="mr-2 h-4 w-4" />
            Characters
          </TabsTrigger>
          <TabsTrigger value="movies" disabled={movies.length < 2}>
            <Film className="mr-2 h-4 w-4" />
            Movies
          </TabsTrigger>
          <TabsTrigger value="ships" disabled={ships.length < 2}>
            <Rocket className="mr-2 h-4 w-4" />
            Ships
          </TabsTrigger>
          <TabsTrigger value="planets" disabled={planets.length < 2}>
            <Globe className="mr-2 h-4 w-4" />
            Planets
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {itemsForType.length < 2 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            You need at least 2 favorites of this type to compare.
          </p>
          <Button asChild>
            <a href={`/${selectedTab}`}>Explore {selectedTab}</a>
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              Select items to compare (max 3)
            </h2>
            <div className="flex flex-wrap gap-4">
              {itemsForType.map((item) => (
                <Button
                  key={item.id}
                  variant={
                    selectedItems.includes(item.id) ? "default" : "outline"
                  }
                  onClick={() => handleSelectItem(item.id)}
                  className="flex items-center gap-2"
                >
                  {item.name}
                </Button>
              ))}
            </div>
            {selectedItems.length > 0 && (
              <Button
                variant="ghost"
                onClick={clearSelections}
                className="mt-4"
              >
                Clear selection
              </Button>
            )}
          </div>

          {selectedItems.length < 2 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Select at least 2 items to compare.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-max">
                <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(250px,1fr))] gap-4">
                  {/* Header row with images */}
                  <div className="h-[200px]"></div>
                  {selectedItemsDetails.map((item) => (
                    <Card key={item.id} className="h-[200px] overflow-hidden">
                      <div className="relative w-full h-full">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-lg font-bold">{item.name}</h3>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {/* Comparison rows */}
                  {getComparisonFields().map((field) => (
                    <div key={field.key} className="contents">
                      <div className="bg-muted p-4 rounded-lg flex items-center">
                        <span className="font-medium">{field.label}</span>
                      </div>
                      {selectedItemsDetails.map((item) => (
                        <div
                          key={`${item.id}-${field.key}`}
                          className="bg-card p-4 rounded-lg border"
                        >
                          <span>
                            {item[field.key as keyof typeof item]}
                            {field.unit ? ` ${field.unit}` : ""}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
