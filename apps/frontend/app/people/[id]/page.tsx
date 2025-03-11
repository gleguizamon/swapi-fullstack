import { getPeopleById } from "@/lib/api";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Film, Car, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { extractIdFromUrl } from "@/utils/extractIdFromUrl";

export default async function CharacterPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const character = await getPeopleById(id);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <Button
        asChild
        variant="ghost"
        className="mb-6 hover:bg-primary/10 transition-colors"
      >
        <Link href="/people" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Personajes
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  {character.name}
                </h1>
                <FavoriteButton
                  id={extractIdFromUrl(character.url)}
                  type="character"
                  name={character.name}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Film className="mr-2 h-5 w-5 text-primary" />
                Films
              </h2>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-lg">
                  Appears in{" "}
                  <span className="font-bold text-primary">
                    {character.films.length}
                  </span>{" "}
                  film
                  {character.films.length !== 1 ? "s" : ""}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Car className="mr-2 h-5 w-5 text-primary" />
                  Vehicles
                </h2>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-lg">
                    {character.vehicles.length > 0 ? (
                      <>
                        Piloted{" "}
                        <span className="font-bold text-primary">
                          {character.vehicles.length}
                        </span>{" "}
                        vehicle
                        {character.vehicles.length !== 1 ? "s" : ""}
                      </>
                    ) : (
                      "No vehicles piloted"
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Rocket className="mr-2 h-5 w-5 text-primary" />
                  Starships
                </h2>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-lg">
                    {character.starships.length > 0 ? (
                      <>
                        Piloted{" "}
                        <span className="font-bold text-primary">
                          {character.starships.length}
                        </span>{" "}
                        starship
                        {character.starships.length !== 1 ? "s" : ""}
                      </>
                    ) : (
                      "No starships piloted"
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
                Character Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Gender
                  </h3>
                  <p className="font-semibold text-lg">{character.gender}</p>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Birth Year
                  </h3>
                  <p className="font-semibold text-lg">
                    {character.birth_year}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Height
                  </h3>
                  <p className="font-semibold text-lg">{character.height}cm</p>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Mass
                  </h3>
                  <p className="font-semibold text-lg">{character.mass}kg</p>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Hair Color
                  </h3>
                  <p className="font-semibold text-lg">
                    {character.hair_color}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Eye Color
                  </h3>
                  <p className="font-semibold text-lg">{character.eye_color}</p>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Skin Color
                  </h3>
                  <p className="font-semibold text-lg">
                    {character.skin_color}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
