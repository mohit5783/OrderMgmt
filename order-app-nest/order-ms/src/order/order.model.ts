import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { OrderItem } from "./order-item.model";

export type OrderDocument = Order & Document;

@Schema()
export class Order {
    @Prop()
    OrderID: Number;
    @Prop()
    OrderNo: Number;
    @Prop()
    CustomerID: Number;
    @Prop()
    PMethod: String;
    @Prop()
    GTotal: Number;
    @Prop()
    DeletedOrderItemIDs: String;
    @Prop()
    OrderItems: Array<OrderItem>;
}
export const OrderSchema = SchemaFactory.createForClass(Order);