import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Film, Globe, Rocket, Users } from "lucide-react";
// import { Button } from "@repo/ui/button"; //todo

export default function Home() {
  return (
    <div className="flex flex-col py-16 mx-auto items-center justify-center text-center min-h-dvh container space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          Explora el Universo de Star Wars
        </h1>
        <p className="mx-auto text-muted-foreground md:text-xl">
          Descubre personajes, películas, naves y planetas de la saga de Star
          Wars.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mt-8">
        <CategoryCard
          title="Personajes"
          description="Conoce a los héroes, villanos y todos los demás."
          href="/characters"
          icon={<Users className="h-8 w-8" />}
        />
        <CategoryCard
          title="Películas"
          description="Explora la saga épica a través de todos los episodios."
          href="/movies"
          icon={<Film className="h-8 w-8" />}
        />
        <CategoryCard
          title="Naves"
          description="Desde cazas estelares hasta destructores estelares."
          href="/ships"
          icon={<Rocket className="h-8 w-8" />}
        />
        <CategoryCard
          title="Planetas"
          description="Visita los mundos de la galaxia de Star Wars."
          href="/planets"
          icon={<Globe className="h-8 w-8" />}
        />
      </div>
    </div>
  );
}

function CategoryCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-6 text-left shadow-md transition-all hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <div className="mt-4">
        <Button asChild>
          <Link href={href}>
            Explorar {title} <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
