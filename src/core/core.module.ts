import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors';
import { DataForLocalDbService, ParseDataService } from './services';
import { KgsModule } from '../kgs/kgs.module';
import { ProductModule } from '../product/product.module';
import { CityModule } from '../city/city.module';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    DataForLocalDbService,
    ParseDataService,
  ],
  imports: [KgsModule, ProductModule, CityModule],
})
export class CoreModule {}
