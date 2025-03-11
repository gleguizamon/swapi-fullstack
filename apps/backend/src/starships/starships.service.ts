import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import type { Starship } from '@repo/shared-types';
import { AxiosResponse } from 'axios';

@Injectable()
export class StarshipsService {
  constructor(private readonly httpService: HttpService) {}

  async getStarships(page = 1): Promise<Starship[]> {
    const response: AxiosResponse<Starship[]> = await firstValueFrom(
      this.httpService.get(`https://swapi.dev/api/starships/?page=${page}`),
    );
    return response.data;
  }

  async getStarshipById(id: string): Promise<Starship> {
    const response: AxiosResponse<Starship> = await firstValueFrom(
      this.httpService.get(`https://swapi.dev/api/starships/${id}/`),
    );

    const starship = response.data;

    const pilotDetails = await Promise.all(
      starship.pilots.map(async (pilotUrl: string) => {
        const pilotResponse = await firstValueFrom(
          this.httpService.get(pilotUrl),
        );
        return pilotResponse.data;
      }),
    );

    const filmDetails = await Promise.all(
      starship.films.map(async (filmUrl: string) => {
        const filmResponse = await firstValueFrom(
          this.httpService.get(filmUrl),
        );
        return filmResponse.data;
      }),
    );

    return {
      ...starship,
      pilots: pilotDetails,
      films: filmDetails,
    };
  }
}
