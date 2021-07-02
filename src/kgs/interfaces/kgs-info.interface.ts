export interface IKgsInfoKey {
  KGS36: number;
  KGS22: number;
}

export interface IKgsInfo extends IKgsInfoKey {
  KGS8?: number;
  [key: string]: any;
}
