import { Injectable } from '@nestjs/common';
import { IKgsInfo, IKgsInfoKey } from '../interfaces';

@Injectable()
export class KgsInfoRepository {
  create(kgsInfo: IKgsInfo) {
    //return this.KgsInfo.create(kgsInfo);
  }

  findOne(key: IKgsInfoKey) {
    //return this.KgsInfo.get(key);
  }
}
