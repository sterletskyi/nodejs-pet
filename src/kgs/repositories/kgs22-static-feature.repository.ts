import { Injectable } from '@nestjs/common';

import { AbstractRepository } from '../../common/abstract-providers/abstract.repository';
import { Kgs22StaticFeature } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class Kgs22StaticFeatureRepository extends AbstractRepository<Kgs22StaticFeature> {
  constructor(
    @InjectModel(Kgs22StaticFeature.name)
    private readonly Kgs22StaticFeature: Model<Kgs22StaticFeature>,
  ) {
    super(Kgs22StaticFeature, {
      modelName: 'Kgs22StaticFeature',
    });
  }
}
