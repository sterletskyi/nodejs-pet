export interface IKgs22StaticFeatureKey {
  KGS22: number;
}

export interface IKgs22StaticFeature extends IKgs22StaticFeatureKey {
  KGS8: number;
  PLZ: number;
  latitude?: number;
  longitude?: number;
  rectangle?: number[][];
  [key: string]: any;
}
