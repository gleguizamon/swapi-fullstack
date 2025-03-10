import { Controller, Get, Param } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  async getAllPeople() {
    return this.peopleService.getPeople();
  }

  @Get(':id')
  async getPerson(@Param('id') id: string) {
    return this.peopleService.getPersonById(id);
  }
}
