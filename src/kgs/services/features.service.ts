import { Injectable } from '@nestjs/common';
import { featuresNames, featuresCalculationKinds } from '../constants';
import {
  FeaturesByKgs22ResponseDto,
  FeaturesByParamsResponseDto,
} from '../dto/responses';
import {
  Kgs22StaticFeatureRepository,
  Kgs36GeneralRepository,
} from '../repositories';
import { CityService } from '../../city/services';
import { Kgs22StaticFeature, Kgs36General } from '../schemas';

@Injectable()
export class FeaturesService {
  constructor(
    private readonly Kgs22StaticFeatureRepository: Kgs22StaticFeatureRepository,
    private readonly Kgs36GeneralRepository: Kgs36GeneralRepository,
    private readonly CityService: CityService,
  ) {}

  async getFeaturesByKgs22Key(kgs22StaticFeatureKey: {
    KGS22: number;
  }): Promise<FeaturesByKgs22ResponseDto> {
    const kgs22StaticFeatureObject =
      await this.Kgs22StaticFeatureRepository.findOne(kgs22StaticFeatureKey);

    return kgs22StaticFeatureObject
      ? this.getFeaturesObject(kgs22StaticFeatureObject)
      : null;
  }

  getFeaturesObject(
    kgs22StaticFeatureObject: Kgs22StaticFeature,
  ): FeaturesByKgs22ResponseDto {
    const data = {};

    featuresNames.map(async (featureName) => {
      data[featureName] = {};

      for (const calculationKind of featuresCalculationKinds) {
        data[`${featureName}`][calculationKind] =
          kgs22StaticFeatureObject[`${featureName}_${calculationKind}`];
      }
    });

    return <FeaturesByKgs22ResponseDto>data;
  }

  public async getKGS22KeyFromKSG36ByParameters(
    zipAndCityObject: Partial<Kgs36General>,
  ): Promise<number> {
    const record = await this.Kgs36GeneralRepository.findOne(
      {
        PLZ: zipAndCityObject.PLZ,
        STR_NAME: new RegExp('^' + zipAndCityObject.STR_NAME.toLowerCase()),
      },
      {
        KGS22: 1,
      },
    );

    return record ? record.KGS22 : null;
  }

  /**
   * 1. Find by zip and street name
   * 2. Find by zip
   * 3. Find by city
   * */
  async getFeaturesByParams(
    searchParams: Partial<Kgs36General>,
  ): Promise<FeaturesByParamsResponseDto> {
    return (
      (await this.getFeaturesByZipAndStreetName(searchParams)) ??
      (await this.getFeaturesByZip(searchParams.PLZ)) ??
      (await this.getFeaturesByCity(searchParams.PO_NAME))
    );
  }

  async getFeaturesByZipAndStreetName(
    searchParams: Partial<Kgs36General>,
  ): Promise<FeaturesByParamsResponseDto> {
    let result: FeaturesByParamsResponseDto = null;
    const zipAndCityObject: Partial<Kgs36General> = {
      PLZ: searchParams.PLZ,
      STR_NAME: searchParams.STR_NAME,
    };
    const kgs22Key: number = await this.getKGS22KeyFromKSG36ByParameters(
      zipAndCityObject,
    );

    if (kgs22Key) {
      const kgs22StaticFeatureObject: Kgs22StaticFeature =
        await this.Kgs22StaticFeatureRepository.findOne({ KGS22: kgs22Key });

      if (kgs22StaticFeatureObject) {
        const markers = await this.getMarkersByKgs22AndStreetName({
          KGS22: kgs22Key,
          STR_NAME: zipAndCityObject.STR_NAME,
        });
        result = {
          features: this.getFeaturesObject(kgs22StaticFeatureObject),
          rectangle: kgs22StaticFeatureObject.rectangle,
          markers,
        };
      }
    }

    return result;
  }

  public async getMarkersByKgs22AndStreetName(params: {
    KGS22: number;
    STR_NAME: string;
  }): Promise<number[][]> {
    let result: number[][] = [[]];
    const kgs36GeneralArray: Partial<Kgs36General[]> =
      await this.Kgs36GeneralRepository.aggregate([
        {
          $match: {
            KGS22: params.KGS22,
            'search:STR_NAME': { $regex: new RegExp('^' + params.STR_NAME) }, //TODO remove search
          },
        },
        {
          $project: {
            latitude: 1,
            longitude: 1,
          },
        },
        {
          $group: { _id: { latitude: '$latitude', longitude: '$longitude' } },
        },
      ]);

    if (kgs36GeneralArray.length) {
      result = kgs36GeneralArray.map((element) => [
        element['_id'].latitude,
        element['_id'].longitude,
      ]);
    }

    return result;
  }

  async getFeaturesByZip(PLZ: number): Promise<FeaturesByParamsResponseDto> {
    let result = null;
    const kgs22KeysByPLZ = (
      await this.Kgs36GeneralRepository.findAll({ PLZ }, { KGS22: 1 })
    ).map((key) => key.KGS22);

    const kgs22StaticFeatureArray =
      await this.Kgs22StaticFeatureRepository.findAll({
        KGS22: { $in: kgs22KeysByPLZ },
      });

    if (kgs22StaticFeatureArray.length === 1) {
      const [neededKgs22StaticFeature] = kgs22StaticFeatureArray;
      result = {
        features: this.getFeaturesObject(neededKgs22StaticFeature),
        rectangle: [neededKgs22StaticFeature.rectangle], //TODO change rectangle content
        markers: [
          [
            neededKgs22StaticFeature.latitude,
            neededKgs22StaticFeature.longitude,
          ],
        ],
      };
    } else if (kgs22StaticFeatureArray.length > 1) {
      const foundFeatures = kgs22StaticFeatureArray.map((feature) =>
        this.getFeaturesObject(feature),
      );

      const minLatitude = Math.min(
        ...kgs22StaticFeatureArray.map((feature) => feature.latitude),
      );
      const maxLatitude = Math.max(
        ...kgs22StaticFeatureArray.map((feature) => feature.latitude),
      );

      const minLongitude = Math.min(
        ...kgs22StaticFeatureArray.map((feature) => feature.longitude),
      );
      const maxLongitude = Math.max(
        ...kgs22StaticFeatureArray.map((feature) => feature.longitude),
      );

      const rectangle = this.CityService.getRectangle([
        minLatitude,
        maxLatitude,
        minLongitude,
        maxLongitude,
      ]);

      const markers = [
        [(maxLatitude + minLatitude) / 2, (maxLatitude + maxLongitude) / 2],
      ];
      result = {
        features: this.featuresAvg(foundFeatures),
        rectangle,
        markers,
      };
    }

    return result;
  }

  featuresAvg(arr): FeaturesByKgs22ResponseDto {
    const avgData = {
      centrality: {
        country_avg: 0,
        country: 0,
        city: 0,
        city_avg: 0,
        plz: 0,
        plz_avg: 0,
      },
      social_status: {
        country: 0,
        city_avg: 0,
        country_avg: 0,
        plz: 0,
        city: 0,
        plz_avg: 0,
      },
      young_population: {
        country: 0,
        city_avg: 0,
        country_avg: 0,
        plz: 0,
        city: 0,
        plz_avg: 0,
      },
      family_friendliness: {
        country: 0,
        city_avg: 0,
        country_avg: 0,
        plz: 0,
        city: 0,
        plz_avg: 0,
      },
      urban: {
        country: 0,
        city_avg: 0,
        country_avg: 0,
        plz: 0,
        city: 0,
        plz_avg: 0,
      },
      nature: {
        country: 0,
        city_avg: 0,
        country_avg: 0,
        plz: 0,
        city: 0,
        plz_avg: 0,
      },
    };

    arr.map((feature) => {
      for (const featureKey in feature) {
        for (const objectKey in feature[featureKey]) {
          avgData[featureKey][objectKey] += feature[featureKey][objectKey];
        }
      }
    });

    const arrayLength = arr.length;

    for (const featureKey in avgData) {
      for (const objectKey in avgData[featureKey]) {
        avgData[featureKey][objectKey] = +(
          avgData[featureKey][objectKey] / arrayLength
        ).toFixed(2);
      }
    }
    return avgData;
  }

  async getFeaturesByCity(
    PO_NAME: string,
  ): Promise<FeaturesByParamsResponseDto> {
    let result = null;
    const kgs22KeysByCity = (
      await this.Kgs36GeneralRepository.findAll(
        { PO_NAME: PO_NAME.toLowerCase() },
        { KGS22: 1 },
      )
    ) //TODO remove toLowerCase
      .map((key) => key.KGS22);

    if (kgs22KeysByCity.length) {
      const avgCalculationsObject = {};
      const addFieldsObject = {};

      featuresNames.map(async (featureName) => {
        featuresCalculationKinds.forEach((calculationKind) => {
          avgCalculationsObject[`${featureName}_${calculationKind}`] = {
            $avg: `$${featureName}_${calculationKind}`,
          };
          addFieldsObject[`${featureName}_${calculationKind}`] = {
            $round: [`$${featureName}_${calculationKind}`, 2],
          };
        });
      });

      const kgs22AvgStaticFeatureObjectsArray: Kgs22StaticFeature[] =
        await this.Kgs22StaticFeatureRepository.aggregate([
          {
            $match: { KGS22: { $in: kgs22KeysByCity } },
          },
          {
            $group: { _id: null, ...avgCalculationsObject },
          },
          {
            $addFields: addFieldsObject,
          },
        ]);
      const kgs22AvgStaticFeatureObject: Kgs22StaticFeature =
        kgs22AvgStaticFeatureObjectsArray.length
          ? kgs22AvgStaticFeatureObjectsArray[0]
          : null;

      if (kgs22AvgStaticFeatureObject) {
        result = {
          features: this.getFeaturesObject(kgs22AvgStaticFeatureObject), //TODO each features calculation need to be fixed with 2 after 0
        };
      }
    }

    return <FeaturesByParamsResponseDto>result;
  }
}
