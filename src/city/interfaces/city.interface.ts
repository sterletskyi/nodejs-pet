export interface ICityKey {
  name: string;
}

export interface ICity extends ICityKey {
  latitude: number;
  longitude: number;
  boundingbox: number[];
  rectangle: number[][];
  geojson: { type: string; coordinates: any[] };
  [key: string]: any;
}
