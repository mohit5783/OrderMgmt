import { Get, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from './order.model';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('ORDERS') private readonly OrderModel: Model<OrderDocument>
    ) { }

    async getAllOrders() {
        return this.OrderModel.find().exec();
    }
    async getGenerateOrderID() {
        return await (await this.OrderModel.find().exec()).length + 1; 
    }
    async getOrderbyID(data: number) {
        var realOrderID = await this.findMonogoOrderID(data);
        return this.OrderModel.findById(realOrderID);
    }

    async findMonogoOrderID(data: number) {
        var smid = await this.OrderModel.findOne({ OrderID: data }).exec();
        return smid._id;
    }
    async SaveOrder(data) {
        this.OrderModel.create(data);
    }
    async deleteOrderbyID(data: number) {
        var realOrderID = await this.findMonogoOrderID(data);
        return this.OrderModel.findByIdAndDelete(realOrderID);
    }
}
