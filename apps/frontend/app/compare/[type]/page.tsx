"use client";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useFavorites } from "@/components/favorites-provider";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";

export default function CompareTypePage({
  params,
}: {
  params: { type: string };
}) {
  const router = useRouter();
  const { favorites } = useFavorites();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Validate type
  const validTypes = ["characters", "movies", "ships", "planets"];
  const type = params.type;

  useEffect(() => {
    if (!validTypes.includes(type)) {
      notFound();
    }
  }, [type]);

  // Get singular type name
  const getTypeSingular = () => {
    switch (type) {
      case "characters":
        return "character";
      case "movies":
        return "movie";
      case "ships":
        return "ship";
      case "planets":
        return "planet";
      default:
        return "";
    }
  };

  // Get items to display based on type
  const itemsForType = favorites.filter(
    (item) => item.type === getTypeSingular()
  );

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

  // Start comparison
  const startComparison = () => {
    router.push(`/compare?type=${type}&ids=${selectedItems.join(",")}`);
  };

  return (
    <div className="px-6 py-6">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/compare" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a la comparación
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-8">Comparar {type}</h1>

      {itemsForType.length < 2 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            You need at least 2 favorites of this type to compare.
          </p>
          <Button asChild>
            <Link href={`/${type}`}>Explore {type}</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              Seleccionar items para comparar (max 3)
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {itemsForType.map((item) => (
                <Card
                  key={item.id}
                  className={`overflow-hidden cursor-pointer transition-all ${
                    selectedItems.includes(item.id)
                      ? "ring-2 ring-primary"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => handleSelectItem(item.id)}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              {selectedItems.length > 0 && (
                <Button variant="outline" onClick={clearSelections}>
                  Borrar selección
                </Button>
              )}

              <Button
                disabled={selectedItems.length < 2}
                onClick={startComparison}
              >
                Comparar {selectedItems.length} {type}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
