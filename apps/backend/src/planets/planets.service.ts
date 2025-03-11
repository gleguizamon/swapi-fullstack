import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import type { Planet } from '@repo/shared-types';
import { AxiosResponse } from 'axios';

@Injectable()
export class PlanetsService {
  constructor(private readonly httpService: HttpService) {}

  async getPlanets(page = 1): Promise<Planet[]> {
    const response: AxiosResponse<Planet[]> = await firstValueFrom(
      this.httpService.get(`https://swapi.dev/api/planets/?page=${page}`),
    );
    return response.data;
  }

  async getPlanetById(id: string): Promise<Planet> {
    const response: AxiosResponse<Planet> = await firstValueFrom(
      this.httpService.get(`https://swapi.dev/api/planets/${id}/`),
    );

    const planet = response.data;

    const residentDetails = await Promise.all(
      planet.residents.map(async (residentUrl: string) => {
        const residentResponse = await firstValueFrom(
          this.httpService.get(residentUrl),
        );
        return residentResponse.data;
      }),
    );

    return {
      ...planet,
      residents: residentDetails,
    };
  }
}
