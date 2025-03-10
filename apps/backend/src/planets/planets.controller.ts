import { Controller, Get, Param } from '@nestjs/common';
import { PlanetsService } from './planets.service';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  async getAllPlanets() {
    return this.planetsService.getPlanets();
  }

  @Get(':id')
  async getPlanet(@Param('id') id: string) {
    return this.planetsService.getPlanetById(id);
  }
}
