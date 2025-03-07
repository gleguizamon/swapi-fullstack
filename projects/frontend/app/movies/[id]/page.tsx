import { getMovie } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const movie = await getMovie(params.id);

    return (
      <div className="px-6 py-6">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/movies" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Movies
          </Link>
        </Button>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
            <Image
              src={movie.image || "/placeholder.svg"}
              alt={movie.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4">
              <FavoriteButton
                id={movie.id}
                type="movie"
                name={movie.title}
                image={movie.image}
                className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
              />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">
              Episode {movie.episode_id}: {movie.title}
            </h1>
            <p className="text-muted-foreground mb-6">
              Released: {new Date(movie.release_date).toLocaleDateString()}
            </p>

            <div className="grid gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Opening Crawl</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="whitespace-pre-line">{movie.opening_crawl}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Director
                  </h3>
                  <p className="font-medium">{movie.director}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Producer
                  </h3>
                  <p className="font-medium">{movie.producer}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Characters</h3>
                <p className="text-muted-foreground">
                  Features {movie.characters.length} character
                  {movie.characters.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Planets</h3>
                <p className="text-muted-foreground">
                  Visits {movie.planets.length} planet
                  {movie.planets.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Starships</h3>
                <p className="text-muted-foreground">
                  Features {movie.starships.length} starship
                  {movie.starships.length !== 1 ? "s" : ""}
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
