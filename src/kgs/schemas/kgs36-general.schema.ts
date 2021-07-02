import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Kgs36GeneralDocument = Kgs36General & Document;

@Schema({ strict: false })
export class Kgs36General {
  @Prop({ type: Number, required: true })
  KGS36: number;

  @Prop({ type: Number, required: true })
  KGS22: number;

  @Prop({ type: Number, required: true })
  V_DAT_POST: number;

  @Prop({ type: Number, required: true })
  PLZ: number;

  @Prop({ type: String, required: true })
  PO_NAME: string;

  @Prop({ type: String, required: false })
  POT_NAME: string;

  @Prop({ type: String, required: true })
  STR_NAME: string;

  @Prop({ type: Number, required: true })
  latitude: number;

  @Prop({ type: Number, required: true })
  longitude: number;
}

export const Kgs36GeneralSchema = SchemaFactory.createForClass(Kgs36General);
