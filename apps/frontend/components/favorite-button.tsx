"use client";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useFavorites } from "@/components/favorites-provider";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FavoriteButtonProps {
  id: string;
  type: "character" | "movie" | "ship" | "planet";
  name: string;
  image?: string;
  className?: string;
}

export function FavoriteButton({
  id,
  type,
  name,
  image,
  className,
}: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const isFav = isFavorite(id, type);

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFavorite(id, type);
      toast("Removed from favorites", {
        description: `${name} has been removed from your favorites.`,
      });
    } else {
      addFavorite({ id, type, name, image });
      toast("Added to favorites", {
        description: `${name} has been added to your favorites.`,
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(className)}
      onClick={handleToggleFavorite}
      aria-label={
        isFav ? `Remove ${name} from favorites` : `Add ${name} to favorites`
      }
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors",
          isFav ? "fill-red-500 text-red-500" : "fill-none"
        )}
      />
    </Button>
  );
}
