import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import type { Film } from '@repo/shared-types';
import { AxiosResponse } from 'axios';

@Injectable()
export class FilmsService {
  constructor(private readonly httpService: HttpService) {}

  async getFilms(page = 1): Promise<Film[]> {
    const response: AxiosResponse<Film[]> = await firstValueFrom(
      this.httpService.get(`https://swapi.dev/api/films/?page=${page}`),
    );
    return response.data;
  }

  async getFilmById(id: string): Promise<Film> {
    const response: AxiosResponse<Film> = await firstValueFrom(
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
