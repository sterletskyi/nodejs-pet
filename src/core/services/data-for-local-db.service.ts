import { Injectable, OnModuleInit } from '@nestjs/common';

import {
  Kgs36GeneralRepository,
  Kgs22StaticFeatureRepository,
  KgsInfoRepository,
} from '../../kgs/repositories';
import { IKgsInfo } from '../../kgs/interfaces';
import { CityRepository } from '../../city/repositories';

import * as FeatureStaticKGS22Array from '../../kgs/files/feature_static_kgs22_munchen.json';
import * as KGS8LocalCommunityArray from '../../kgs/files/kgs8_local_community_munchen.json';
import * as KGS22CoordinatesArray from '../../kgs/files/kgs22_coordinates_munchen.json';
import * as KGS22ResidentalAreaArray from '../../kgs/files/kgs22_residental_area_munchen.json';
import * as KGS36TArray from '../../kgs/files/kgs36_t_munchen.json';
import * as CityArray from '../../city/files/city_munchen.json';
import { ICity } from '../../city/interfaces';
import { CityService } from '../../city/services';
import { Kgs22StaticFeature, Kgs36General } from '../../kgs/schemas';

@Injectable()
export class DataForLocalDbService implements OnModuleInit {
  private readonly isLocalEnv = process.env.APP_ENV === 'local';
  private readonly needToRun =
    process.env.AWS_NEED_TO_FILL_BY_TEST_DATA === 'true';

  constructor(
    private readonly KgsInfoRepository: KgsInfoRepository,
    private readonly Kgs22StaticFeatureRepository: Kgs22StaticFeatureRepository,
    private readonly Kgs36GeneralRepository: Kgs36GeneralRepository,
    private readonly CityRepository: CityRepository,
    private readonly CityService: CityService,
  ) {}

  async onModuleInit(): Promise<void> {
    if (this.isLocalEnv && this.needToRun) {
      await this.fillLocalDb();
    }
  }

  async fillLocalDb(): Promise<void> {
    await Promise.all([
      // this.fillKgs22StaticFeature(),
      // this.fillKgs36General(),
      // this.fillCity(),
    ]);
    console.log('Local DynamoDB was filled');
  }

  async fillKgsInfo(): Promise<any[]> {
    const promises = [];

    for (const kgs36Object of KGS36TArray) {
      const mainObject: IKgsInfo = {
        KGS36: kgs36Object.KGS36,
        KGS22: kgs36Object.KGS22,
      };

      const kgs22ResidentalAreaObject: Record<string, any> =
        this.getObjectFromArrayByProperty(
          'KGS22',
          kgs36Object.KGS22,
          KGS22ResidentalAreaArray,
        );
      const featureStaticKgs22Object: Record<string, any> =
        this.getObjectFromArrayByProperty(
          'KGS22',
          kgs36Object.KGS22,
          FeatureStaticKGS22Array,
        );
      const kgs22CoordinatesObject: Record<string, any> =
        this.getObjectFromArrayByProperty(
          'KGS22',
          kgs36Object.KGS22,
          KGS22CoordinatesArray,
        );

      let kgs8LocalCommunityObject: Record<string, any> | null = null;

      if (kgs22ResidentalAreaObject && kgs22ResidentalAreaObject.KGS8) {
        kgs8LocalCommunityObject = this.getObjectFromArrayByProperty(
          'KGS8',
          parseInt(kgs22ResidentalAreaObject.KGS8),
          KGS8LocalCommunityArray,
        );
        mainObject.KGS8 = parseInt(kgs22ResidentalAreaObject.KGS8);
      }

      this.mergeObjects(mainObject, kgs36Object, 'kgs36T');

      if (kgs22ResidentalAreaObject)
        this.mergeObjects(
          mainObject,
          kgs22ResidentalAreaObject,
          'kgs22ResidentalArea',
        );
      if (featureStaticKgs22Object)
        this.mergeObjects(
          mainObject,
          featureStaticKgs22Object,
          'featureStaticKgs22',
        );
      if (kgs22CoordinatesObject)
        this.mergeObjects(
          mainObject,
          kgs22CoordinatesObject,
          'kgs22Coordinates',
        );
      if (kgs8LocalCommunityObject)
        this.mergeObjects(
          mainObject,
          kgs8LocalCommunityObject,
          'kgs8LocalCommunity',
        );
      promises.push(this.KgsInfoRepository.create(mainObject));
    }

    return Promise.all(promises);
  }

  async fillKgs22StaticFeature(): Promise<Kgs22StaticFeature[]> {
    const promises = [];

    for (const kgs22FeatureStaticObject of FeatureStaticKGS22Array) {
      const mainObject: any = kgs22FeatureStaticObject;

      const item = await this.Kgs22StaticFeatureRepository.findOne({
        KGS22: mainObject.KGS22,
      });

      if (item) continue;

      const kgs22CoordinatesObject: Record<string, any> =
        this.getObjectFromArrayByProperty(
          'KGS22',
          mainObject.KGS22,
          KGS22CoordinatesArray,
        );

      if (kgs22CoordinatesObject) {
        delete kgs22CoordinatesObject.KGS22;
        kgs22CoordinatesObject.rectangle = JSON.parse(
          kgs22CoordinatesObject.rectangle,
        );
        this.mergeObjects(mainObject, kgs22CoordinatesObject);
      }

      promises.push(this.Kgs22StaticFeatureRepository.create(mainObject));
    }

    return promises;
  }

  async fillKgs36General(): Promise<Kgs36General[]> {
    const KGSToSave = [];

    for (const KGS36T of KGS36TArray) {
      const Kgs36WithKgs22 = await this.Kgs36GeneralRepository.findOne(KGS36T);

      if (!Kgs36WithKgs22) {
        KGSToSave.push(this.Kgs36GeneralRepository.create(KGS36T));
      }
    }

    return KGSToSave;
  }

  async fillCity(): Promise<ICity[]> {
    const promises = [];

    for (const city of CityArray) {
      const item = await this.CityRepository.findOne({
        name: city.name,
      });

      if (item) continue;

      const mainObject: ICity = {
        ...city,
        rectangle: this.CityService.getRectangle(city.boundingbox),
      };

      promises.push(this.CityRepository.create(mainObject));
    }

    return promises;
  }

  getObjectFromArrayByProperty(
    property: string,
    value: number | string,
    array: Record<string, any>[],
  ): Record<string, any> {
    return array.find((element) => element[property] === value);
  }

  mergeObjects(
    mainObjectRecord: Record<string, any>,
    relatedObject: Record<string, any>,
    prefix: string | null = null,
  ): void {
    for (const [key, value] of Object.entries(relatedObject)) {
      if (key === 'id') continue;
      mainObjectRecord[prefix ? `${prefix}_${key}` : key] = value;
    }
  }
}
