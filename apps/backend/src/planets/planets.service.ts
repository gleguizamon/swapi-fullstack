import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class PlanetsService {
  constructor(private readonly httpService: HttpService) {}

  async getPlanets(): Promise<Observable<AxiosResponse<string[]>>> {
    const response = await firstValueFrom(
      this.httpService.get('https://swapi.dev/api/planets/'),
    );
    return response.data;
  }

  async getPlanetById(id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`https://swapi.dev/api/planets/${id}/`),
    );

    const planet = response.data;

    // Obtener detalles de personajes que viven en el planeta
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
