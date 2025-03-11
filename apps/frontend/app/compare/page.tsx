"use client";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { X } from "lucide-react";
import { useFavorites } from "@/context/favorites";

export default function ComparePage() {
  const { favorites } = useFavorites();
  const [selectedTab, setSelectedTab] = useState("character");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const character = favorites.filter((item) => item.type === "character");
  const film = favorites.filter((item) => item.type === "film");
  const starship = favorites.filter((item) => item.type === "starship");
  const planet = favorites.filter((item) => item.type === "planet");

  const getItemsForType = () => {
    switch (selectedTab) {
      case "character":
        return character;
      case "film":
        return film;
      case "starship":
        return starship;
      case "planet":
        return planet;
      default:
        return [];
    }
  };

  const itemsForType = getItemsForType();

  const selectedItemsDetails = itemsForType.filter((item) =>
    selectedItems.includes(item.id),
  );

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      if (selectedItems.length < 3) {
        setSelectedItems([...selectedItems, id]);
      }
    }
  };

  const clearSelections = () => {
    setSelectedItems([]);
  };

  const getComparisonFields = () => {
    switch (selectedTab) {
      case "character":
        return [
          { label: "Height", key: "height", unit: "cm" },
          { label: "Mass", key: "mass", unit: "kg" },
          { label: "Hair Color", key: "hair_color" },
          { label: "Eye Color", key: "eye_color" },
          { label: "Birth Year", key: "birth_year" },
          { label: "Gender", key: "gender" },
        ];
      case "film":
        return [
          { label: "Episode", key: "episode_id" },
          { label: "Director", key: "director" },
          { label: "Producer", key: "producer" },
          { label: "Release Date", key: "release_date" },
          { label: "Characters Count", key: "characters_count" },
          { label: "Planets Count", key: "planets_count" },
        ];
      case "starship":
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
      case "planet":
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
      <h1 className="text-3xl font-bold mb-8">Comparar items</h1>

      <Tabs
        defaultValue="character"
        value={selectedTab}
        onValueChange={(value) => {
          setSelectedTab(value);
          setSelectedItems([]);
        }}
        className="mb-8"
      >
        <TabsList>
          <TabsTrigger value="character" disabled={character.length < 2}>
            Personajes
          </TabsTrigger>
          <TabsTrigger value="film" disabled={film.length < 2}>
            Películas
          </TabsTrigger>
          <TabsTrigger value="starship" disabled={starship.length < 2}>
            Naves
          </TabsTrigger>
          <TabsTrigger value="planet" disabled={planet.length < 2}>
            Planetas
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {itemsForType.length < 2 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            Necesitas al menos 2 favoritos de este tipo para comparar.
          </p>
          <Button asChild>
            <a href={`/${selectedTab}`}>Explorar {selectedTab}</a>
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <div className="flex items-center mb-4 gap-4">
              <h2 className="text-xl font-bold">
                Seleccionar items para comparar (max 3)
              </h2>
              {selectedItems.length > 0 && (
                <Button
                  onClick={clearSelections}
                  size="sm"
                  className="cursor-pointer"
                >
                  <X className="h-4 w-4" />
                  Borrar selección
                </Button>
              )}
            </div>
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
          </div>

          {selectedItems.length < 2 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Seleccionar al menos 2 items para comparar
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-card rounded-xl shadow-lg p-8">
              <div className="min-w-max">
                <div className="grid grid-cols-[240px_repeat(auto-fill,minmax(280px,1fr))] gap-4">
                  <div className="flex items-center justify-center p-4 rounded-lg bg-muted/30">
                    <h3 className="text-xl font-semibold text-muted-foreground">
                      Comparación
                    </h3>
                  </div>
                  {selectedItemsDetails.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg bg-primary/10 border-l-4 border-l-primary"
                    >
                      <h3 className="text-xl font-bold text-center">
                        {item.name}
                      </h3>
                    </div>
                  ))}

                  {getComparisonFields().map((field, index) => (
                    <div key={field.key} className="contents">
                      <div
                        className={`py-5 px-8 rounded-lg flex items-center ${index % 2 === 0 ? "bg-muted/30" : "bg-muted/10"}`}
                      >
                        <span className="font-medium text-muted-foreground text-lg">
                          {field.label}
                        </span>
                      </div>
                      {selectedItemsDetails.map((item) => {
                        const value = item[field.key];
                        return (
                          <div
                            key={`${item.id}-${field.key}`}
                            className={`py-5 px-8 transition-colors rounded-lg flex items-center ${index % 2 === 0 ? "bg-muted/30" : "bg-muted/10"} hover:bg-accent/10`}
                          >
                            <span className="font-medium text-lg">
                              {value !== undefined && value !== ""
                                ? value
                                : "N/A"}
                              {field.unit && value ? ` ${field.unit}` : ""}
                            </span>
                          </div>
                        );
                      })}
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
