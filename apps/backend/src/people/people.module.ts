import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';

@Module({
  imports: [HttpModule],
  providers: [PeopleService],
  controllers: [PeopleController],
})
export class PeopleModule {}
