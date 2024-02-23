import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type PaisDocument = Pais & Document;

@Schema()
export class Pais {
  @Prop({ required: true })
  id: string
  name: string;
  
}

export const CountrySchema = SchemaFactory.createForClass(Pais);