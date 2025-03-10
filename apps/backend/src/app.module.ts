import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import { StarshipsModule } from './starships/starships.module';
import { FilmsModule } from './films/films.module';
import { PlanetsModule } from './planets/planets.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    PeopleModule,
    StarshipsModule,
    FilmsModule,
    PlanetsModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
