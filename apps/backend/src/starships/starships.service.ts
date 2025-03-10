import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import type { Starship } from '@repo/shared-types';

@Injectable()
export class StarshipsService {
  constructor(private readonly httpService: HttpService) {}

  private extractIdFromUrl(url: string): string {
    const matches = url.match(/\/([0-9]+)\/$/);
    return matches ? matches[1] : '';
  }

  async getStarships(page = 1): Promise<Starship[]> {
    const response = await firstValueFrom(
      this.httpService.get(`https://swapi.dev/api/starships/?page=${page}`),
    );

    const data = response.data;

    const enhancedResults = data.results.map((starship: any) => ({
      ...starship,
      id: this.extractIdFromUrl(starship.url),
    }));

    return { ...data, results: enhancedResults };
  }

  async getStarshipById(id: string) {
    const response = await firstValueFrom(
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
