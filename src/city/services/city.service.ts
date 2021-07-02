import { Injectable } from '@nestjs/common';
import { BoundingBoxCoordinatesEnum } from '../enums';

@Injectable()
export class CityService {
  public getRectangle(boundingbox: number[]) {
    return [
      [
        boundingbox[BoundingBoxCoordinatesEnum.MaxLatitude],
        boundingbox[BoundingBoxCoordinatesEnum.MinLongitude],
      ],
      [
        boundingbox[BoundingBoxCoordinatesEnum.MaxLatitude],
        boundingbox[BoundingBoxCoordinatesEnum.MaxLongitude],
      ],
      [
        boundingbox[BoundingBoxCoordinatesEnum.MinLatitude],
        boundingbox[BoundingBoxCoordinatesEnum.MaxLongitude],
      ],
      [
        boundingbox[BoundingBoxCoordinatesEnum.MinLatitude],
        boundingbox[BoundingBoxCoordinatesEnum.MinLongitude],
      ],
    ];
  }
}
