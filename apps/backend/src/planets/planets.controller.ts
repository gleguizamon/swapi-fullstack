import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlanetsService } from './planets.service';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  async getAllPlanets(@Query('page') page: string = '1') {
    return this.planetsService.getPlanets(parseInt(page));
  }

  @Get(':id')
  async getPlanet(@Param('id') id: string) {
    return this.planetsService.getPlanetById(id);
  }
}
