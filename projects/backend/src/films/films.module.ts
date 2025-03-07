import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';

@Module({
  imports: [HttpModule],
  providers: [FilmsService],
  controllers: [FilmsController],
})
export class FilmsModule {}
