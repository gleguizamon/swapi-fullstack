import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import type { Planet } from '@repo/shared-types';

@Injectable()
export class PlanetsService {
  constructor(private readonly httpService: HttpService) {}

  private extractIdFromUrl(url: string): string {
    const matches = url.match(/\/([0-9]+)\/$/);
    return matches ? matches[1] : '';
  }

  async getPlanets(page = 1): Promise<Planet[]> {
    const response = await firstValueFrom(
      this.httpService.get(`https://swapi.dev/api/planets/?page=${page}`),
    );

    const data = response.data;

    const enhancedResults = data.results.map((planet: any) => ({
      ...planet,
      id: this.extractIdFromUrl(planet.url),
    }));

    return { ...data, results: enhancedResults };
  }

  async getPlanetById(id: string) {
    const response = await firstValueFrom(
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
