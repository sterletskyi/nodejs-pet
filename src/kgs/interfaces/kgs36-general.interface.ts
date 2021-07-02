export interface IKgs36GeneralKey {
  KGS36: number;
}

export interface IKgs36General extends IKgs36GeneralKey {
  KGS22: number;
  PLZ: number;
  PO_NAME: string;
  STR_NAME: string;
  POT_NAME: string;
  latitude: number;
  longitude: number;
  V_DAT_POST: number;
  [key: string]: any;
}

export enum EnumKgs36GeneralSearchFields {
  PO_NAME = 'search:PO_NAME',
  STR_NAME = 'search:STR_NAME',
  POT_NAME = 'search:POT_NAME',
}
