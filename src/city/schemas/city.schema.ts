import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema({ strict: false })
export class City {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  latitude: string;

  /* Comma separated list of min latitude, max latitude, min longitude, max longitude. */
  @Prop({ type: Number, required: true })
  longitude: string;

  @Prop({ type: Array, required: true })
  boundingbox: Array<any>;

  @Prop({ type: Array, required: true })
  rectangle: Array<number[]>;

  @Prop({ type: Object, required: true })
  geojson: {};
}

export const CitySchema = SchemaFactory.createForClass(City);
