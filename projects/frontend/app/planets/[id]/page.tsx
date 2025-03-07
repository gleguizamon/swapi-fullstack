import { getPlanet } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function PlanetPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const planet = await getPlanet(params.id);

    return (
      <div className="px-6 py-6">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/planets" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Planets
          </Link>
        </Button>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={planet.image || "/placeholder.svg"}
              alt={planet.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4">
              <FavoriteButton
                id={planet.id}
                type="planet"
                name={planet.name}
                image={planet.image}
                className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
              />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{planet.name}</h1>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Climate
                  </h3>
                  <p className="font-medium">{planet.climate}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Terrain
                  </h3>
                  <p className="font-medium">{planet.terrain}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Diameter
                  </h3>
                  <p className="font-medium">{planet.diameter}km</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Gravity
                  </h3>
                  <p className="font-medium">{planet.gravity}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Rotation Period
                  </h3>
                  <p className="font-medium">{planet.rotation_period} hours</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Orbital Period
                  </h3>
                  <p className="font-medium">{planet.orbital_period} days</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Surface Water
                  </h3>
                  <p className="font-medium">{planet.surface_water}%</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Population
                  </h3>
                  <p className="font-medium">{planet.population}</p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-2">Films</h3>
                <p className="text-muted-foreground">
                  Appears in {planet.films.length} film
                  {planet.films.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Residents</h3>
                <p className="text-muted-foreground">
                  {planet.residents.length > 0
                    ? `Home to ${planet.residents.length} character${
                        planet.residents.length !== 1 ? "s" : ""
                      }`
                    : "No known residents"}
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
