import { Controller, Get, Param, Query } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  async getAllPeople(@Query('page') page: string = '1') {
    return this.peopleService.getPeople(parseInt(page));
  }

  @Get(':id')
  async getPerson(@Param('id') id: string) {
    return this.peopleService.getPersonById(id);
  }
}
