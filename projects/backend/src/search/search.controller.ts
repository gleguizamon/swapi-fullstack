import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query('query') query: string) {
    if (!query) {
      return { message: 'Debes ingresar un término de búsqueda' };
    }

    return this.searchService.search(query);
  }
}
