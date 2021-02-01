import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    ItemID:number;
    @Prop()
    Name:string;
    @Prop()
    Price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
