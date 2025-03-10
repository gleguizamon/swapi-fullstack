import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import type { Film } from '@repo/shared-types';

@Injectable()
export class FilmsService {
  constructor(private readonly httpService: HttpService) {}

  private extractIdFromUrl(url: string): string {
    const matches = url.match(/\/([0-9]+)\/$/);
    return matches ? matches[1] : '';
  }

  async getFilms(page = 1): Promise<Film[]> {
    const response = await firstValueFrom(
      this.httpService.get(`https://swapi.dev/api/films/?page=${page}`),
    );

    const data = response.data;

    const enhancedResults = data.results.map((movie) => ({
      ...movie,
      id: this.extractIdFromUrl(movie.url),
    }));

    return { ...data, results: enhancedResults };
  }

  async getFilmById(id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`https://swapi.dev/api/films/${id}/`),
    );

    const film = response.data;

    const characterDetails = await Promise.all(
      film.characters.map(async (characterUrl: string) => {
        const characterResponse = await firstValueFrom(
          this.httpService.get(characterUrl),
        );
        return characterResponse.data;
      }),
    );

    const starshipDetails = await Promise.all(
      film.starships.map(async (starshipUrl: string) => {
        const starshipResponse = await firstValueFrom(
          this.httpService.get(starshipUrl),
        );
        return starshipResponse.data;
      }),
    );

    return {
      ...film,
      characters: characterDetails,
      starships: starshipDetails,
    };
  }
}
