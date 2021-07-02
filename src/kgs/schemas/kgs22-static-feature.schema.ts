import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Kgs22StaticFeatureDocument = Kgs22StaticFeature & Document;

@Schema({ strict: false })
export class Kgs22StaticFeature {
  @Prop({ type: Number, required: true })
  KGS22: number;

  @Prop({ type: Number, required: true })
  KGS8: number;

  @Prop({ type: Number, required: true })
  PLZ: number;

  @Prop({ type: Number, required: true })
  latitude: number;

  @Prop({ type: Number, required: true })
  longitude: number;

  @Prop({ type: Number, required: true })
  radius: number;

  @Prop({ type: Array, required: true })
  rectangle: Array<number[]>;

  @Prop({ type: Number, required: true })
  centrality_plz: number;

  @Prop({ type: Number, required: true })
  centrality_plz_avg: number;

  @Prop({ type: Number, required: true })
  centrality_city: number;

  @Prop({ type: Number, required: true })
  centrality_city_avg: number;

  @Prop({ type: Number, required: true })
  centrality_country: number;

  @Prop({ type: Number, required: true })
  centrality_country_avg: number;

  @Prop({ type: Number, required: true })
  social_status: number;

  @Prop({ type: Number, required: true })
  social_status_plz: number;

  @Prop({ type: Number, required: true })
  social_status_plz_avg: number;

  @Prop({ type: Number, required: true })
  social_status_city: number;

  @Prop({ type: Number, required: true })
  social_status_city_avg: number;

  @Prop({ type: Number, required: true })
  social_status_country: number;

  @Prop({ type: Number, required: true })
  social_status_country_avg: number;

  @Prop({ type: Number, required: true })
  young_population: number;

  @Prop({ type: Number, required: true })
  young_population_plz: number;

  @Prop({ type: Number, required: true })
  young_population_plz_avg: number;

  @Prop({ type: Number, required: true })
  young_population_city: number;

  @Prop({ type: Number, required: true })
  young_population_city_avg: number;

  @Prop({ type: Number, required: true })
  young_population_country: number;

  @Prop({ type: Number, required: true })
  young_population_country_avg: number;

  @Prop({ type: Number, required: true })
  urban: number;

  @Prop({ type: Number, required: true })
  urban_plz: number;

  @Prop({ type: Number, required: true })
  urban_plz_avg: number;

  @Prop({ type: Number, required: true })
  urban_city: number;

  @Prop({ type: Number, required: true })
  urban_city_avg: number;

  @Prop({ type: Number, required: true })
  urban_country: number;

  @Prop({ type: Number, required: true })
  urban_country_avg: number;

  @Prop({ type: Number, required: true })
  family_friendliness: number;

  @Prop({ type: Number, required: true })
  family_friendliness_plz: number;

  @Prop({ type: Number, required: true })
  family_friendliness_plz_avg: number;

  @Prop({ type: Number, required: true })
  family_friendliness_city: number;

  @Prop({ type: Number, required: true })
  family_friendliness_city_avg: number;

  @Prop({ type: Number, required: true })
  family_friendliness_country: number;

  @Prop({ type: Number, required: true })
  family_friendliness_country_avg: number;

  @Prop({ type: Number, required: true })
  nature: number;

  @Prop({ type: Number, required: true })
  nature_plz: number;

  @Prop({ type: Number, required: true })
  nature_plz_avg: number;

  @Prop({ type: Number, required: true })
  nature_city: number;

  @Prop({ type: Number, required: true })
  nature_city_avg: number;

  @Prop({ type: Number, required: true })
  nature_country: number;

  @Prop({ type: Number, required: true })
  nature_country_avg: number;
}

export const Kgs22StaticFeatureSchema =
  SchemaFactory.createForClass(Kgs22StaticFeature);
