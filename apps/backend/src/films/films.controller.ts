import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms(@Query('page') page: string = '1') {
    return this.filmsService.getFilms(parseInt(page));
  }

  @Get(':id')
  async getFilm(@Param('id') id: string) {
    return this.filmsService.getFilmById(id);
  }
}
