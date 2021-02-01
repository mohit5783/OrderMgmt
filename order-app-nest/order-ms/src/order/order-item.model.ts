import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type OrderItemDocument = OrderItem & Document;

@Schema()
export class OrderItem {
    @Prop()
    OrderItemID: number;
    @Prop()
    OrderID: number;
    @Prop()
    ItemID: number;
    @Prop()
    Quantity: number;
    @Prop()
    ItemName: string;
    @Prop()
    Price: number;
    @Prop()
    Total: number;
}