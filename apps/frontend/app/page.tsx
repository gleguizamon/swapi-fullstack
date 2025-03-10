import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Film, Globe, Rocket, Users } from "lucide-react";

const cards = [
  {
    title: "Personajes",
    description: "Descubrí todos los personajes.",
    href: "/people",
    icon: <Users className="h-8 w-8" />,
  },
  {
    title: "Películas",
    description: "Explora la saga épica a través de todos los episodios.",
    href: "/films",
    icon: <Film className="h-8 w-8" />,
  },
  {
    title: "Naves",
    description: "Conocé todas las naves del universo Star Wars.",
    href: "/starships",
    icon: <Rocket className="h-8 w-8" />,
  },
  {
    title: "Planetas",
    description: "Visitá los mundos de la galaxia de Star Wars.",
    href: "/planets",
    icon: <Globe className="h-8 w-8" />,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col py-16 mx-auto items-center justify-center text-center min-h-dvh container space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          Star Wars Explorer
        </h1>
        <p className="mx-auto text-muted-foreground md:text-xl">
          Descubre personajes, películas, naves y planetas de la saga de Star
          Wars.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mt-8">
        {cards.map((card) => {
          return (
            <CategoryCard
              key={card.title}
              title={card.title}
              description={card.description}
              href={card.href}
              icon={card.icon}
            />
          );
        })}
      </div>
    </div>
  );
}

type Props = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

function CategoryCard({ title, description, href, icon }: Props) {
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
