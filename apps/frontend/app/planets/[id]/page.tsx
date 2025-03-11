import { getPlanetById } from "@/lib/api";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { extractIdFromUrl } from "@/utils/extractIdFromUrl";

export default async function PlanetPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const planet = await getPlanetById(id);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <Button
        asChild
        variant="ghost"
        className="mb-6 hover:bg-primary/10 transition-colors"
      >
        <Link href="/planets" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Planetas
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  {planet.name}
                </h1>
                <FavoriteButton
                  id={extractIdFromUrl(planet.url)}
                  type="planet"
                  name={planet.name}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Planet Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Climate
                  </h3>
                  <p className="font-semibold text-lg">{planet.climate}</p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Terrain
                  </h3>
                  <p className="font-semibold text-lg">{planet.terrain}</p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Diameter
                  </h3>
                  <p className="font-semibold text-lg">{planet.diameter}km</p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Gravity
                  </h3>
                  <p className="font-semibold text-lg">{planet.gravity}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Films</h3>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-lg">
                    Appears in{" "}
                    <span className="font-bold text-primary">
                      {planet.films.length}
                    </span>{" "}
                    film
                    {planet.films.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Residents</h3>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-lg">
                    {planet.residents.length > 0 ? (
                      <>
                        Home to{" "}
                        <span className="font-bold text-primary">
                          {planet.residents.length}
                        </span>{" "}
                        character
                        {planet.residents.length !== 1 ? "s" : ""}
                      </>
                    ) : (
                      "No known residents"
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
                Additional Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Rotation Period
                  </h3>
                  <p className="font-semibold text-lg">
                    {planet.rotation_period} hours
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Orbital Period
                  </h3>
                  <p className="font-semibold text-lg">
                    {planet.orbital_period} days
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Surface Water
                  </h3>
                  <p className="font-semibold text-lg">
                    {planet.surface_water}%
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Population
                  </h3>
                  <p className="font-semibold text-lg">{planet.population}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
