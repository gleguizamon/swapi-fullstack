import { getCharacters } from "@/lib/api";
import CharactersList from "@/components/characters-list";

export default async function CharactersPage({ searchParams }) {
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1;
  const { results: characters, count } = await getCharacters(page);

  return (
    <div className="px-6 py-6">
      <h1 className="text-3xl font-bold mb-8">Star Wars Characters</h1>
      <CharactersList
        characters={characters}
        count={count}
        initialPage={page}
      />
    </div>
  );
}
