import { ApiProperty } from '@nestjs/swagger';
import { FeaturesByKgs22ResponseDto } from './features-by-kgs22-response.dto';

export class FeaturesByParamsResponseDto {
  @ApiProperty()
  features: FeaturesByKgs22ResponseDto;
  @ApiProperty({ example: [[50.922733, 12.5605182]] })
  markers: number[][];
  @ApiProperty({
    example: [
      [50.922733, 12.5605182],
      [50.922733, 12.5605182],
      [50.922733, 12.5605182],
      [50.922733, 12.5605182],
    ],
  })
  rectangle: number[][];
}
