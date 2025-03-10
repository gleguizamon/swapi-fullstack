import { Controller, Get, Param, Query } from '@nestjs/common';
import { StarshipsService } from './starships.service';

@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Get()
  async getAllStarships(@Query('page') page: string = '1') {
    return this.starshipsService.getStarships(parseInt(page));
  }

  @Get(':id')
  async getStarshipById(@Param('id') id: string) {
    return this.starshipsService.getStarshipById(id);
  }
}
