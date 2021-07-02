import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ strict: false })
export class Product {
  @Prop({ type: Number, required: true })
  product_id: number;

  @Prop({ type: Number, required: true })
  KGS22: number;

  @Prop({ type: String, required: true })
  product_url: string;

  @Prop({ type: String, required: true })
  product_name: string;

  @Prop({ type: Number, required: true })
  product_area: number;

  @Prop({ type: String, required: false })
  product_price: string;

  @Prop({ type: String, required: false })
  product_city: string;

  @Prop({ type: Number, required: true })
  product_zip: number;

  @Prop({ type: Number, required: true })
  product_latitude: number;

  @Prop({ type: Number, required: true })
  product_longitude: number;

  @Prop({
    type: [Number],
    required: true,
    index: '2dsphere',
  })
  coordinates: [number];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
