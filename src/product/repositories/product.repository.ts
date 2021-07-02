import { Injectable } from '@nestjs/common';
import { Product } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from '../interfaces';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private readonly ProductModel: Model<Product>,
  ) {}

  async save(product): Promise<IProduct> {
    return new this.ProductModel(product).save();
  }

  findOne(product: Partial<IProduct>): Promise<IProduct | null> {
    return this.ProductModel.findOne(product).exec();
  }
  find(product: Partial<IProduct>): Promise<IProduct[] | null> {
    return this.ProductModel.find(product).exec();
  }
}
