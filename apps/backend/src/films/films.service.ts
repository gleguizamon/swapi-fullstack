import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class FilmsService {
  constructor(private readonly httpService: HttpService) {}

  async getFilms(): Promise<Observable<AxiosResponse<string[]>>> {
    const response = await firstValueFrom(
      this.httpService.get('https://swapi.dev/api/films/'),
    );
    return response.data;
  }

  async getFilmById(id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`https://swapi.dev/api/films/${id}/`),
    );

    const film = response.data;

    // Obtener detalles de personajes
    const characterDetails = await Promise.all(
      film.characters.map(async (characterUrl: string) => {
        const characterResponse = await firstValueFrom(
          this.httpService.get(characterUrl),
        );
        return characterResponse.data;
      }),
    );

    // Obtener detalles de naves
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
