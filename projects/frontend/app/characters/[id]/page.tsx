import { getCharacter } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function CharacterPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const character = await getCharacter(params.id);

    return (
      <div className="px-6 py-6">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/characters" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Characters
          </Link>
        </Button>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={character.image || "/placeholder.svg"}
              alt={character.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4">
              <FavoriteButton
                id={character.id}
                type="character"
                name={character.name}
                image={character.image}
                className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
              />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{character.name}</h1>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Gender
                  </h3>
                  <p className="font-medium">{character.gender}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Birth Year
                  </h3>
                  <p className="font-medium">{character.birth_year}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Height
                  </h3>
                  <p className="font-medium">{character.height}cm</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Mass
                  </h3>
                  <p className="font-medium">{character.mass}kg</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Hair Color
                  </h3>
                  <p className="font-medium">{character.hair_color}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Eye Color
                  </h3>
                  <p className="font-medium">{character.eye_color}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Skin Color
                  </h3>
                  <p className="font-medium">{character.skin_color}</p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-2">Films</h3>
                <p className="text-muted-foreground">
                  Appears in {character.films.length} film
                  {character.films.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Vehicles</h3>
                <p className="text-muted-foreground">
                  {character.vehicles.length > 0
                    ? `Piloted ${character.vehicles.length} vehicle${
                        character.vehicles.length !== 1 ? "s" : ""
                      }`
                    : "No vehicles piloted"}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Starships</h3>
                <p className="text-muted-foreground">
                  {character.starships.length > 0
                    ? `Piloted ${character.starships.length} starship${
                        character.starships.length !== 1 ? "s" : ""
                      }`
                    : "No starships piloted"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
