import { Controller, Get, Param } from '@nestjs/common';
import { StarshipsService } from './starships.service';

@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Get()
  async getAllStarships() {
    return this.starshipsService.getStarships();
  }

  @Get(':id')
  async getStaship(@Param('id') id: string) {
    return this.starshipsService.getStarshipById(id);
  }
}
