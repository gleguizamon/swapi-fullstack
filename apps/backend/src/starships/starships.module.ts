import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';

@Module({
  imports: [HttpModule],
  providers: [StarshipsService],
  controllers: [StarshipsController],
})
export class StarshipsModule {}
