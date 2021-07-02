import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { KgsModule } from './kgs/kgs.module';
import { ProductModule } from './product/product.module';
import { ApiKeyModule } from './api-key/api-key.module';
import { CityModule } from './city/city.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, { useCreateIndex: true }),
    CoreModule,
    KgsModule,
    ProductModule,
    ApiKeyModule,
    CityModule,
  ],
})
export class AppModule {}
