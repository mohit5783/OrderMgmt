import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
    @Prop()
    CustomerID:number;
    @Prop()
    Name:string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
