"use client";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type FavoriteItem = {
  id: string;
  type: "character" | "film" | "starship" | "planet";
  name: string;
  image?: string;
};

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string, type: string) => void;
  isFavorite: (id: string, type: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("starWarsAppFavorites");
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error("Error al obtener favoritos de localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("starWarsAppFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === item.id && fav.type === item.type)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFavorite = (id: string, type: string) => {
    setFavorites((prev) =>
      prev.filter((item) => !(item.id === id && item.type === type)),
    );
  };

  const isFavorite = (id: string, type: string) => {
    return favorites.some((item) => item.id === id && item.type === type);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("`useFavorites` debe ser usado con `FavoritesProvider`");
  }
  return context;
}
