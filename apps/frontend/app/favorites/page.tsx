"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ArrowRight, Film, Globe, Rocket, Trash2, Users } from "lucide-react";
import { useFavorites } from "@/context/favorites";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const [selectedTab, setSelectedTab] = useState("all");

  const character = favorites.filter((item) => item.type === "character");
  const film = favorites.filter((item) => item.type === "film");
  const starship = favorites.filter((item) => item.type === "starship");
  const planet = favorites.filter((item) => item.type === "planet");

  const getItemsToDisplay = () => {
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
        return favorites;
    }
  };

  const itemsToDisplay = getItemsToDisplay();

  const getIconForType = (type: string) => {
    switch (type) {
      case "character":
        return <Users className="h-4 w-4" />;
      case "film":
        return <Film className="h-4 w-4" />;
      case "starship":
        return <Rocket className="h-4 w-4" />;
      case "planet":
        return <Globe className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getLinkForItem = (item: { id: string; type: string }) => {
    switch (item.type) {
      case "character":
        return `/people/${item.id}`;
      case "film":
        return `/films/${item.id}`;
      case "starship":
        return `/starships/${item.id}`;
      case "planet":
        return `/planets/${item.id}`;
      default:
        return "/";
    }
  };

  return (
    <div className="px-6 py-6">
      <h1 className="text-3xl font-bold mb-8">Favoritos</h1>
      <Tabs
        defaultValue="all"
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="mb-8"
      >
        <TabsList>
          <TabsTrigger value="all">Todo ({favorites.length})</TabsTrigger>
          <TabsTrigger value="character">
            Personajes {character.length > 0 && `(${character.length})`}
          </TabsTrigger>
          <TabsTrigger value="film">
            Películas {film.length > 0 && `(${film.length})`}
          </TabsTrigger>
          <TabsTrigger value="starship">
            Naves {starship.length > 0 && `(${starship.length})`}
          </TabsTrigger>
          <TabsTrigger value="planet">
            Planetas {planet.length > 0 && `(${planet.length})`}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {itemsToDisplay.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No has añadido favoritos todavía.
          </p>
          <Button asChild>
            <Link href="/">Explore Star Wars</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {itemsToDisplay.map((item) => (
            <Card
              key={`${item.type}-${item.id}`}
              className="overflow-hidden transition-all hover:shadow-lg border-l-4 border-l-primary bg-card hover:bg-accent/10"
            >
              <div className="absolute top-2 right-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="bg-background/80 backdrop-blur-sm hover:bg-background/90 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Eliminar de favoritos?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Estás seguro que quieres eliminar {item.name} de tus
                        favoritos?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => removeFavorite(item.id, item.type)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                  {getIconForType(item.type)}
                  <span className="capitalize">{item.type}</span>
                </div>
                <h2 className="text-xl font-bold">{item.name}</h2>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link
                  href={getLinkForItem(item)}
                  className="text-primary hover:underline"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    Ver detalles <ArrowRight />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
