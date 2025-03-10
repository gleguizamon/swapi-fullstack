import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class StarshipsService {
  constructor(private readonly httpService: HttpService) {}

  async getStarships(): Promise<Observable<AxiosResponse<string[]>>> {
    const response = await firstValueFrom(
      this.httpService.get('https://swapi.dev/api/starships/'),
    );
    return response.data;
  }

  async getStarshipById(id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`https://swapi.dev/api/starships/${id}/`),
    );

    const starship = response.data;

    // Obtener detalles de pilotos (personajes)
    const pilotDetails = await Promise.all(
      starship.pilots.map(async (pilotUrl: string) => {
        const pilotResponse = await firstValueFrom(
          this.httpService.get(pilotUrl),
        );
        return pilotResponse.data;
      }),
    );

    // Obtener detalles de películas
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
