import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FeaturesByParamsRequestDto {
  @ApiProperty()
  @IsNumber()
  zip: number;
  @ApiProperty()
  @IsString()
  city: string;
  @ApiProperty()
  @IsString()
  streetname: string;
}
