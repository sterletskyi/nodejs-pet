import { Module } from '@nestjs/common';
import {
  Kgs22StaticFeatureSchema,
  KgsInfoSchema,
  Kgs36GeneralSchema,
  KgsInfo,
  Kgs36General,
  Kgs22StaticFeature,
} from './schemas';
import {
  KgsInfoRepository,
  Kgs36GeneralRepository,
  Kgs22StaticFeatureRepository,
} from './repositories';

import { featuresController, KgsController } from './controllers';
import { FeaturesService, Kgs36Service } from './services';
import { CityService } from '../city/services';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: KgsInfo.name, schema: KgsInfoSchema }]),
    MongooseModule.forFeature([
      { name: Kgs36General.name, schema: Kgs36GeneralSchema },
    ]),
    MongooseModule.forFeature([
      { name: Kgs22StaticFeature.name, schema: Kgs22StaticFeatureSchema },
    ]),
  ],
  providers: [
    CityService,
    Kgs36Service,
    FeaturesService,
    KgsInfoRepository,
    Kgs36GeneralRepository,
    Kgs22StaticFeatureRepository,
  ],
  exports: [
    KgsInfoRepository,
    Kgs36GeneralRepository,
    Kgs22StaticFeatureRepository,
    Kgs22StaticFeatureRepository,
  ],
  controllers: [KgsController, featuresController],
})
export class KgsModule {}
