// Types for our Star Wars data
export interface Character {
  id: string
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  url: string
  image?: string
}

export interface Movie {
  id: string
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  characters: string[]
  planets: string[]
  starships: string[]
  vehicles: string[]
  species: string[]
  url: string
  image?: string
}

export interface Ship {
  id: string
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  hyperdrive_rating: string
  MGLT: string
  starship_class: string
  pilots: string[]
  films: string[]
  url: string
  image?: string
}

export interface Planet {
  id: string
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: string[]
  films: string[]
  url: string
  image?: string
}

// Base API URL - in a real app, this would be your NestJS backend
const API_BASE_URL = "https://swapi.dev/api"

// Helper function to extract ID from URL
function extractIdFromUrl(url: string): string {
  const matches = url.match(/\/(\d+)\/$/)
  return matches ? matches[1] : ""
}

// Generic fetch function with error handling
async function fetchFromApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error)
    throw error
  }
}

// Function to get all characters with pagination
export async function getCharacters(page = 1): Promise<{
  results: Character[]
  count: number
  next: string | null
  previous: string | null
}> {
  const data = await fetchFromApi<{
    results: Character[]
    count: number
    next: string | null
    previous: string | null
  }>(`/people/?page=${page}`)

  // Add IDs and placeholder images to each character
  const enhancedResults = data.results.map((character) => ({
    ...character,
    id: extractIdFromUrl(character.url),
    image: `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(character.name)}`,
  }))

  return {
    ...data,
    results: enhancedResults,
  }
}

// Function to get a specific character by ID
export async function getCharacter(id: string): Promise<Character> {
  const character = await fetchFromApi<Character>(`/people/${id}/`)

  return {
    ...character,
    id,
    image: `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(character.name)}`,
  }
}

// Function to get all movies
export async function getMovies(): Promise<Movie[]> {
  const data = await fetchFromApi<{ results: Movie[] }>("/films/")

  // Add IDs and placeholder images to each movie
  return data.results.map((movie) => ({
    ...movie,
    id: extractIdFromUrl(movie.url),
    image: `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(movie.title)}`,
  }))
}

// Function to get a specific movie by ID
export async function getMovie(id: string): Promise<Movie> {
  const movie = await fetchFromApi<Movie>(`/films/${id}/`)

  return {
    ...movie,
    id,
    image: `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(movie.title)}`,
  }
}

// Function to get all ships with pagination
export async function getShips(page = 1): Promise<{
  results: Ship[]
  count: number
  next: string | null
  previous: string | null
}> {
  const data = await fetchFromApi<{
    results: Ship[]
    count: number
    next: string | null
    previous: string | null
  }>(`/starships/?page=${page}`)

  // Add IDs and placeholder images to each ship
  const enhancedResults = data.results.map((ship) => ({
    ...ship,
    id: extractIdFromUrl(ship.url),
    image: `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(ship.name)}`,
  }))

  return {
    ...data,
    results: enhancedResults,
  }
}

// Function to get a specific ship by ID
export async function getShip(id: string): Promise<Ship> {
  const ship = await fetchFromApi<Ship>(`/starships/${id}/`)

  return {
    ...ship,
    id,
    image: `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(ship.name)}`,
  }
}

// Function to get all planets with pagination
export async function getPlanets(page = 1): Promise<{
  results: Planet[]
  count: number
  next: string | null
  previous: string | null
}> {
  const data = await fetchFromApi<{
    results: Planet[]
    count: number
    next: string | null
    previous: string | null
  }>(`/planets/?page=${page}`)

  // Add IDs and placeholder images to each planet
  const enhancedResults = data.results.map((planet) => ({
    ...planet,
    id: extractIdFromUrl(planet.url),
    image: `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(planet.name)}`,
  }))

  return {
    ...data,
    results: enhancedResults,
  }
}

// Function to get a specific planet by ID
export async function getPlanet(id: string): Promise<Planet> {
  const planet = await fetchFromApi<Planet>(`/planets/${id}/`)

  return {
    ...planet,
    id,
    image: `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(planet.name)}`,
  }
}

