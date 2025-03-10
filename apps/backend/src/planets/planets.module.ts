import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PlanetsService } from 'src/planets/planets.service';
import { PlanetsController } from 'src/planets/planets.controller';

@Module({
  imports: [HttpModule],
  providers: [PlanetsService],
  controllers: [PlanetsController],
})
export class PlanetsModule {}
