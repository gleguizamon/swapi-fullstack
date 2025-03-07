import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Film, Globe, Rocket, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col mx-auto items-center justify-center text-center min-h-dvh container space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          Explore the Star Wars Universe
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Discover characters, movies, ships, and planets from the Star Wars
          saga.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 mt-8">
        <CategoryCard
          title="Characters"
          description="Meet the heroes, villains, and everyone in between."
          href="/characters"
          icon={<Users className="h-8 w-8" />}
        />
        <CategoryCard
          title="Movies"
          description="Explore the epic saga across all episodes."
          href="/movies"
          icon={<Film className="h-8 w-8" />}
        />
        <CategoryCard
          title="Ships"
          description="From starfighters to star destroyers."
          href="/ships"
          icon={<Rocket className="h-8 w-8" />}
        />
        <CategoryCard
          title="Planets"
          description="Visit the worlds of the Star Wars galaxy."
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
          <Link href={href}>Explore {title}</Link>
        </Button>
      </div>
    </div>
  );
}
