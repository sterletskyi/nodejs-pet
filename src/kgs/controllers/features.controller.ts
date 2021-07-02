import {
  Controller,
  Get,
  HttpException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiGuard } from '../../common/guards';
import {
  FeaturesByKgs22RequestDto,
  FeaturesByParamsRequestDto,
} from '../dto/requests';
import { FeaturesService } from '../services';

import {
  FeaturesByKgs22ResponseDto,
  FeaturesByKgs22BadRequestResponseDto,
  FeaturesByParamsResponseDto,
} from '../dto/responses';

import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@UseGuards(ApiGuard)
@Controller('features')
export class featuresController {
  constructor(private readonly FeaturesService: FeaturesService) {}

  @Get(':KGS22')
  @ApiOperation({ summary: 'Return statistics information selected by kgs22' })
  @ApiOkResponse({ type: FeaturesByKgs22ResponseDto })
  @ApiBadRequestResponse({ type: FeaturesByKgs22BadRequestResponseDto })
  async get(@Param() params: FeaturesByKgs22RequestDto) {
    const response = await this.FeaturesService.getFeaturesByKgs22Key({
      KGS22: +params.KGS22,
    });

    if (!response) {
      throw new HttpException(
        `Didn't find any data by KGS22 ${params.KGS22}.`,
        400,
      );
    }

    return response;
  }

  @Get('/params')
  @ApiOperation({
    summary: 'Return statistics information selected by parameters',
  })
  @ApiOkResponse({ type: FeaturesByParamsResponseDto })
  @ApiBadRequestResponse({ type: FeaturesByKgs22BadRequestResponseDto })
  async getByParams(@Query() params: FeaturesByParamsRequestDto) {
    const response = await this.FeaturesService.getFeaturesByParams({
      PLZ: params.zip,
      PO_NAME: params.city,
      STR_NAME: params.streetname,
    });

    if (!response) {
      throw new HttpException(`Didn't find any data by given parameters.`, 400);
    }

    return response;
  }
}
