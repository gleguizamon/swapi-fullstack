import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms() {
    return this.filmsService.getFilms();
  }

  @Get(':id')
  async getFilm(@Param('id') id: string) {
    return this.filmsService.getFilmById(id);
  }
}
