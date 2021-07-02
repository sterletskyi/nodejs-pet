import { Injectable, OnModuleInit } from '@nestjs/common';
import * as ProductJSON from '../../product/JSON/product.json';
import { ProductRepository } from '../../product/repositories';
import { IProduct } from '../../product/interfaces';

@Injectable()
export class ParseDataService implements OnModuleInit {
  private readonly envConfig = process.env.APP_ENV === 'local';
  private readonly needParse = process.env.PARSE_PRODUCTS === 'true';

  constructor(private readonly productRepository: ProductRepository) {}

  async onModuleInit() {
    if (this.envConfig && this.needParse) {
      await this.parseProducts();
    }
  }

  async parseProducts() {
    const productsToSave = [];
    for (const product of ProductJSON) {
      const productByDB = await this.productRepository.findOne(product);
      const productByD = await this.productRepository.find({
        coordinates: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [-84.27326978424058, 30.443902444762696],
            },
            $maxDistance: 1,
          },
        },
      });
      if (!productByDB) {
        product['coordinates'] = [
          product.product_latitude,
          product.product_longitude,
        ];
        productsToSave.push(this.productRepository.save(product));
      }
    }
    await Promise.all(productsToSave);
    const productByD = await this.productRepository.find({
      coordinates: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [50.928106402085, 12.548900026358],
          },
          $maxDistance: 400,
        },
      },
    });
    console.log(productByD);
  }
}
