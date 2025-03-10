import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

  async search(query: string) {
    const endpoints = ['people', 'films', 'planets', 'starships'];
    const results = {};

    for (const endpoint of endpoints) {
      const url = `https://swapi.dev/api/${endpoint}/?search=${query}`;
      const response = await firstValueFrom(this.httpService.get(url));

      results[endpoint] = response.data.results;
    }

    return results;
  }
}
