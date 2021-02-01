import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('MAIN_APP_API_SERVICE') private client: ClientProxy) { }
  
  @Get('AllCustomers')
  async getAllCustomers() {
    return this.appService.getAllCustomers();
  }
  @Get()
  async getAllProducts() {
    return this.appService.getAllProducts();
  }
  @Get('paymentConfirmation')
  async getPaymentConfirmation() {
    return this.appService.getPaymentConfirmation();
  }
  @Get('AllOrders')
  async getAllOrders() {
    return this.appService.getAllOrders();
  }
  @Get('OrderbyID/:id')
  async getOrderbyID(@Param('id') id: number) {
    return await this.appService.getOrderbyID(id);
  }
  @Post('SaveOrder')
  async SaveOrder(@Body() BodyData) {
    return await this.appService.SaveOrder(BodyData);
  }
  @Delete('DelOrder/:id')
  async deleteOrderbyID(@Param('id') id: number) {
    return await this.appService.deleteOrderbyID(id);
  }
  @Get('getGenerateOrderID')
  async getGenerateOrderID() {
    return this.appService.getGenerateOrderID();
  }
  
}
