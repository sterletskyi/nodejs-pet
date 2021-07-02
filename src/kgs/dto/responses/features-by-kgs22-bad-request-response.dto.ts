import { ApiProperty } from '@nestjs/swagger';

export class FeaturesByKgs22BadRequestResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({
    example: `Didn't found any data by KGS22 {your_request_parameter}.`,
  })
  message: string;
}
