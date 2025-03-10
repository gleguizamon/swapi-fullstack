import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { getFilmById } from "@/lib/api";

export default async function FilmPage({ params }: { params: { id: string } }) {
  try {
    const film = await getFilmById(params.id);

    return (
      <div className="container max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-500">
        <Button
          asChild
          variant="ghost"
          className="mb-6 hover:bg-primary/10 transition-colors"
        >
          <Link href="/films" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Películas
          </Link>
        </Button>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    Episode {film.episode_id}: {film.title}
                  </h1>
                  <FavoriteButton id={film.id} type="film" name={film.title} />
                </div>
                <p className="text-muted-foreground mb-2">
                  Released: {new Date(film.release_date).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Opening Crawl</h3>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                  <p className="whitespace-pre-line">{film.opening_crawl}</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Characters</h3>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-lg">
                      Features{" "}
                      <span className="font-bold text-primary">
                        {film.characters.length}
                      </span>{" "}
                      character
                      {film.characters.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Planets</h3>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-lg">
                      Visits{" "}
                      <span className="font-bold text-primary">
                        {film.planets.length}
                      </span>{" "}
                      planet
                      {film.planets.length !== 1 ? "s" : ""}
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
                  Movie Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Director
                    </h3>
                    <p className="font-semibold text-lg">{film.director}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Producer
                    </h3>
                    <p className="font-semibold text-lg">{film.producer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Starships</h3>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-lg">
                    Features{" "}
                    <span className="font-bold text-primary">
                      {film.starships.length}
                    </span>{" "}
                    starship
                    {film.starships.length !== 1 ? "s" : ""}
                  </p>
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
