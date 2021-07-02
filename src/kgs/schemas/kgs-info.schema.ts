import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KgsInfoDocument = KgsInfo & Document;

@Schema({ strict: false })
export class KgsInfo {
  @Prop({ type: Number, required: true })
  KGS36: number;

  @Prop({ type: Number, required: true })
  KGS22: number;

  @Prop({ type: Number, required: true })
  KGS8: number;
}

export const KgsInfoSchema = SchemaFactory.createForClass(KgsInfo);
