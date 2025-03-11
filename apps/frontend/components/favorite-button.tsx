"use client";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useFavorites } from "@/context/favorites";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FavoriteButtonProps {
  id: string;
  type: "character" | "film" | "starship" | "planet";
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
      toast("Eliminado de favoritos", {
        description: `${name} fue eliminado de tus favoritos.`,
      });
    } else {
      addFavorite({ id, type, name, image });
      toast("Añadido a favoritos", {
        description: `${name} fue añadido a tus favoritos.`,
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
        isFav ? `Elimiar ${name} de favoritos` : `Añadir ${name} a favoritos`
      }
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors",
          isFav ? "fill-red-500 text-red-500" : "fill-none",
        )}
      />
    </Button>
  );
}
