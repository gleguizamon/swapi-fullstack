import type { Film, People, Planet, Starship } from "@repo/shared-types";

const API_BASE_URL = "http://localhost:3001";

export async function getPeople(page = 1): Promise<People[]> {
  const response = await fetch(`${API_BASE_URL}/people/?page=${page}`);
  const data = await response.json();
  return data;
}

export async function getPeopleById(id: string): Promise<People> {
  const response = await fetch(`${API_BASE_URL}/people/${id}/`);
  const character = await response.json();

  return { ...character, id };
}

export async function getFilms(page = 1): Promise<Film[]> {
  const response = await fetch(`${API_BASE_URL}/films/?page=${page}`);
  const data = await response.json();
  return data;
}

export async function getFilmById(id: string): Promise<Film> {
  const response = await fetch(`${API_BASE_URL}/films/${id}/`);
  const film = await response.json();
  return { ...film, id };
}

export async function getStarships(page = 1): Promise<Starship[]> {
  const response = await fetch(`${API_BASE_URL}/starships/?page=${page}`);
  const data = await response.json();
  return data;
}

export async function getStarshipById(id: string): Promise<Starship> {
  const response = await fetch(`${API_BASE_URL}/starships/${id}/`);
  const starship = await response.json();

  return { ...starship, id };
}

export async function getPlanets(page = 1): Promise<Planet[]> {
  const response = await fetch(`${API_BASE_URL}/planets/?page=${page}`);
  const data = await response.json();
  return data;
}

export async function getPlanetById(id: string): Promise<Planet> {
  const response = await fetch(`${API_BASE_URL}/planets/${id}/`);
  const planet = await response.json();
  return { ...planet, id };
}
