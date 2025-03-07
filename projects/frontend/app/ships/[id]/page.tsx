import { getShip } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ShipPage({ params }: { params: { id: string } }) {
  try {
    const ship = await getShip(params.id);

    return (
      <div className="px-6 py-6">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/ships" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Ships
          </Link>
        </Button>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={ship.image || "/placeholder.svg"}
              alt={ship.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4">
              <FavoriteButton
                id={ship.id}
                type="ship"
                name={ship.name}
                image={ship.image}
                className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
              />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{ship.name}</h1>
            <p className="text-muted-foreground mb-6">{ship.model}</p>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Class
                  </h3>
                  <p className="font-medium">{ship.starship_class}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Manufacturer
                  </h3>
                  <p className="font-medium">{ship.manufacturer}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Cost
                  </h3>
                  <p className="font-medium">{ship.cost_in_credits} credits</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Length
                  </h3>
                  <p className="font-medium">{ship.length}m</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Max Speed
                  </h3>
                  <p className="font-medium">{ship.max_atmosphering_speed}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Hyperdrive Rating
                  </h3>
                  <p className="font-medium">{ship.hyperdrive_rating}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Crew
                  </h3>
                  <p className="font-medium">{ship.crew}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Passengers
                  </h3>
                  <p className="font-medium">{ship.passengers}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Cargo Capacity
                  </h3>
                  <p className="font-medium">{ship.cargo_capacity} kg</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Consumables
                  </h3>
                  <p className="font-medium">{ship.consumables}</p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-2">Films</h3>
                <p className="text-muted-foreground">
                  Appears in {ship.films.length} film
                  {ship.films.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Pilots</h3>
                <p className="text-muted-foreground">
                  {ship.pilots.length > 0
                    ? `Piloted by ${ship.pilots.length} character${
                        ship.pilots.length !== 1 ? "s" : ""
                      }`
                    : "No known pilots"}
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
