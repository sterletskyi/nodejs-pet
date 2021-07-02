import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EnumKgs36GeneralSearchFields } from '../interfaces';
import { AbstractRepository } from '../../common/abstract-providers/abstract.repository';
import { Kgs36General } from '../schemas';

export class Kgs36GeneralRepository extends AbstractRepository<Kgs36General> {
  constructor(
    @InjectModel('Kgs36General')
    private readonly Kgs36General: Model<Kgs36General>,
  ) {
    super(Kgs36General, {
      modelName: 'Kgs36General',
      searchFields: EnumKgs36GeneralSearchFields,
    });
  }
}
