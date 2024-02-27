import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaisDocument = Pais & Document;

@Schema()
export class Pais {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  alias: string; 
}

export const PaisSchema = SchemaFactory.createForClass(Pais);