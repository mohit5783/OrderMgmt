import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private _orderService: OrderService) { }
    @MessagePattern('AllOrders')
    async getAllOrders() {
        return this._orderService.getAllOrders();
    }
    @MessagePattern('OrderbyID')
    async getOrderbyID(data : number) {
        return this._orderService.getOrderbyID(data);
    }
    @MessagePattern('SaveOrder')
    async SaveOrder(data) {
        return this._orderService.SaveOrder(data);
    }
    @MessagePattern('DelOrder')
    async deleteOrderbyID(data : number) {
        return this._orderService.deleteOrderbyID(data);
    }
    @MessagePattern('getGenerateOrderID')
    async getGenerateOrderID() {
        return this._orderService.getGenerateOrderID();
    }
}
