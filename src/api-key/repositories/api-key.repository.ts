import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { IApiKey } from '../interfaces';
import { ApiKey } from '../schemas';

@Injectable()
export class ApiKeyRepository {
  constructor(
    @InjectModel(ApiKey.name)
    private readonly ApiKeyModel: Model<ApiKey>,
  ) {}

  async create(ApiKey: IApiKey): Promise<IApiKey> {
    const ApiKeyToCreate = await new this.ApiKeyModel(ApiKey);
    return ApiKeyToCreate.save();
  }

  findOne(ApiKeyHashKey: IApiKey): Promise<IApiKey | null> {
    return this.ApiKeyModel.findOne(ApiKeyHashKey).exec();
  }
}
