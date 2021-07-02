import { Injectable } from '@nestjs/common';
import { ICity, ICityKey } from '../interfaces/city.interface';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument } from '../schemas';
import { Model } from 'mongoose';

@Injectable()
export class CityRepository {
  constructor(@InjectModel(City.name) private CityModel: Model<CityDocument>) {}

  async create(city: ICity): Promise<City> {
    const cityToCreate = new this.CityModel(city);

    return cityToCreate.save();
  }

  async update(id: number, city): Promise<any> {
    return this.CityModel.findByIdAndUpdate(id, city, { new: true });
  }

  findOne(key: ICityKey): Promise<City | null> {
    return this.CityModel.findOne(key).exec();
  }

  findAll(): Promise<City[]> {
    return this.CityModel.find().exec();
  }

}
