import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class PeopleService {
  constructor(private readonly httpService: HttpService) {}

  async getPeople(): Promise<Observable<AxiosResponse<string[]>>> {
    const response = await firstValueFrom(
      this.httpService.get('https://swapi.dev/api/people/'),
    );
    return response.data;
  }

  async getPersonById(id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`https://swapi.dev/api/people/${id}/`),
    );

    const person = response.data;

    // Obtener detalles de películas
    const filmDetails = await Promise.all(
      person.films.map(async (filmUrl: string) => {
        const filmResponse = await firstValueFrom(
          this.httpService.get(filmUrl),
        );
        return filmResponse.data;
      }),
    );

    // Obtener detalles de naves
    const starshipDetails = await Promise.all(
      person.starships.map(async (starshipUrl: string) => {
        const starshipResponse = await firstValueFrom(
          this.httpService.get(starshipUrl),
        );
        return starshipResponse.data;
      }),
    );

    // Obtener detalles del planeta de origen
    let homeworldDetails = null;
    if (person.homeworld) {
      const homeworldResponse = await firstValueFrom(
        this.httpService.get(person.homeworld),
      );
      homeworldDetails = homeworldResponse.data;
    }

    return {
      ...person,
      films: filmDetails,
      starships: starshipDetails,
      homeworld: homeworldDetails,
    };
  }
}
