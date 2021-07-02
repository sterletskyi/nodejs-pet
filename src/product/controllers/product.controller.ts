import { Controller, UseGuards } from '@nestjs/common';
import { ApiGuard } from '../../common/guards';

@UseGuards(ApiGuard)
@Controller('product')
export class ProductController {}
