import { getShip } from "@/lib/api";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default async function ShipPage({ params }: { params: { id: string } }) {
  try {
    const ship = await getShip(params.id);

    return (
      <div className="container max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-500">
        <Button asChild variant="ghost" className="mb-6 hover:bg-primary/10 transition-colors">
          <Link href="/ships" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Ships
          </Link>
        </Button>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    {ship.name}
                  </h1>
                  <FavoriteButton
                    id={ship.id}
                    type="ship"
                    name={ship.name}
                    image={ship.image}
                    className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  />
                </div>
                <p className="text-muted-foreground mb-2">{ship.model}</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Ship Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Class
                    </h3>
                    <p className="font-semibold text-lg">{ship.starship_class}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Length
                    </h3>
                    <p className="font-semibold text-lg">{ship.length}m</p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Crew
                    </h3>
                    <p className="font-semibold text-lg">{ship.crew}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Passengers
                    </h3>
                    <p className="font-semibold text-lg">{ship.passengers}</p>
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
                        {ship.films.length}
                      </span>{" "}
                      film
                      {ship.films.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Pilots</h3>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-lg">
                      {ship.pilots.length > 0 ? (
                        <>
                          Piloted by{" "}
                          <span className="font-bold text-primary">
                            {ship.pilots.length}
                          </span>{" "}
                          character
                          {ship.pilots.length !== 1 ? "s" : ""}
                        </>
                      ) : (
                        "No known pilots"
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
                  Technical Specifications
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Manufacturer
                    </h3>
                    <p className="font-semibold text-lg">{ship.manufacturer}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Cost
                    </h3>
                    <p className="font-semibold text-lg">{ship.cost_in_credits} credits</p>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Max Speed
                    </h3>
                    <p className="font-semibold text-lg">{ship.max_atmosphering_speed}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Hyperdrive Rating
                    </h3>
                    <p className="font-semibold text-lg">{ship.hyperdrive_rating}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Cargo Capacity
                    </h3>
                    <p className="font-semibold text-lg">{ship.cargo_capacity} kg</p>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Consumables
                    </h3>
                    <p className="font-semibold text-lg">{ship.consumables}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
