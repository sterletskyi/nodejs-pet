import { ApiProperty } from '@nestjs/swagger';

export class FeaturesByKgs22RequestDto {
  @ApiProperty()
  KGS22: number;
}
