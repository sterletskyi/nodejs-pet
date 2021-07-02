import { Controller, Get, UseGuards } from '@nestjs/common';
import { Kgs36Service } from '../services';
import { ApiGuard } from '../../common/guards';

@UseGuards(ApiGuard)
@Controller('kgs')
export class KgsController {
  constructor(private readonly ksgService: Kgs36Service) {}

  @Get()
  async get() {
    return 'test';
  }
}
