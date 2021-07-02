import { Module } from '@nestjs/common';
import { City, CitySchema } from './schemas';
import { CityRepository } from './repositories';
import { CityService } from './services';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
  providers: [CityRepository, CityService],
  exports: [CityRepository, CityService],
})
export class CityModule {}
