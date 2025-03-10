"use client";
import { useFavorites } from "@/components/favorites-provider";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Film, Globe, Rocket, Trash2, Users } from "lucide-react";
import { useState } from "react";
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

  // Group favorites by type
  const characters = favorites.filter((item) => item.type === "character");
  const movies = favorites.filter((item) => item.type === "movie");
  const ships = favorites.filter((item) => item.type === "ship");
  const planets = favorites.filter((item) => item.type === "planet");

  // Get items to display based on selected tab
  const getItemsToDisplay = () => {
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
        return favorites;
    }
  };

  const itemsToDisplay = getItemsToDisplay();

  // Get icon for item type
  const getIconForType = (type: string) => {
    switch (type) {
      case "character":
        return <Users className="h-4 w-4" />;
      case "movie":
        return <Film className="h-4 w-4" />;
      case "ship":
        return <Rocket className="h-4 w-4" />;
      case "planet":
        return <Globe className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Get link for item type
  const getLinkForItem = (item: { id: string; type: string }) => {
    switch (item.type) {
      case "character":
        return `/characters/${item.id}`;
      case "movie":
        return `/movies/${item.id}`;
      case "ship":
        return `/ships/${item.id}`;
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
        <TabsList className="grid grid-cols-5 w-full max-w-md">
          <TabsTrigger value="all">All ({favorites.length})</TabsTrigger>
          <TabsTrigger value="characters">
            <Users className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Characters</span>
            <span className="sm:hidden">({characters.length})</span>
          </TabsTrigger>
          <TabsTrigger value="movies">
            <Film className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Movies</span>
            <span className="sm:hidden">({movies.length})</span>
          </TabsTrigger>
          <TabsTrigger value="ships">
            <Rocket className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Ships</span>
            <span className="sm:hidden">({ships.length})</span>
          </TabsTrigger>
          <TabsTrigger value="planets">
            <Globe className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Planets</span>
            <span className="sm:hidden">({planets.length})</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {itemsToDisplay.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            You haven't added any favorites yet.
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
                      <span className="sr-only">Remove from favorites</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Remove from favorites?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to remove {item.name} from your
                        favorites?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => removeFavorite(item.id, item.type)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Remove
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
                  View Details
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
