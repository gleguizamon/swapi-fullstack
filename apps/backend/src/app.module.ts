import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { StarshipsModule } from './starships/starships.module';
import { FilmsModule } from './films/films.module';
import { PlanetsModule } from './planets/planets.module';

@Module({
  imports: [PeopleModule, StarshipsModule, FilmsModule, PlanetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
