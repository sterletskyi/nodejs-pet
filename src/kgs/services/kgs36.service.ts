import { Injectable } from '@nestjs/common';
import { Kgs36GeneralRepository } from '../repositories';
import { Kgs36General } from '../schemas';

@Injectable()
export class Kgs36Service {
  constructor(
    private readonly Kgs36GeneralRepository: Kgs36GeneralRepository,
  ) {}
}
