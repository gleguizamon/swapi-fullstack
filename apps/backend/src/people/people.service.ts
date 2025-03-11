import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import type { People } from '@repo/shared-types';
import { AxiosResponse } from 'axios';

@Injectable()
export class PeopleService {
  constructor(private readonly httpService: HttpService) {}

  async getPeople(page = 1): Promise<People[]> {
    const response: AxiosResponse<People[]> = await firstValueFrom(
      this.httpService.get(`https://swapi.dev/api/people/?page=${page}`),
    );
    return response.data;
  }

  async getPersonById(id: string): Promise<People> {
    const response: AxiosResponse<People> = await firstValueFrom(
      this.httpService.get(`https://swapi.dev/api/people/${id}/`),
    );

    const person = response.data;

    const filmDetails = await Promise.all(
      person.films.map(async (filmUrl: string) => {
        const filmResponse = await firstValueFrom(
          this.httpService.get(filmUrl),
        );
        return filmResponse.data;
      }),
    );

    const starshipDetails = await Promise.all(
      person.starships.map(async (starshipUrl: string) => {
        const starshipResponse = await firstValueFrom(
          this.httpService.get(starshipUrl),
        );
        return starshipResponse.data;
      }),
    );

    let homeworldDetails = '';
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
