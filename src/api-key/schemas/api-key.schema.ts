import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApiKeyDocument = ApiKey & Document;

@Schema()
export class ApiKey {
  @Prop({ type: String, required: true })
  ApiKey: string;

  @Prop({ type: String, required: true })
  domain: string;
}

export const apiKeySchema = SchemaFactory.createForClass(ApiKey);
