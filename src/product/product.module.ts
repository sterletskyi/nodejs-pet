import { Module } from '@nestjs/common';
import { ProductService } from './services';
import { Product, ProductSchema } from './schemas';
import { ProductController } from './controllers';
import { ProductRepository } from './repositories';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
  exports: [ProductRepository],
})
export class ProductModule {}
