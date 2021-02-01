import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices'

@Injectable()
export class AppService {
  private clientProduct: ClientProxy;
  private clientPayment: ClientProxy;
  private clientOrder: ClientProxy;
  private clientCustomer: ClientProxy;

  constructor() {
    this.clientProduct = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: 5003
      }
    });
    this.clientPayment = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: 5002
      }
    });
    this.clientOrder = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: 5001
      }
    });
    this.clientCustomer = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: 5005
      }
    });
  }
  async getAllCustomers() {
    return this.clientCustomer.send('AllCustomers', '');
  }
  async getAllProducts() {
    return this.clientProduct.send('AllProducts', '');
  }
  async getPaymentConfirmation() {
    return this.clientPayment.send({ cmd: 'PayConfirm' },'');
  }
  async getAllOrders() {
    return this.clientOrder.send('AllOrders', '');
  }
  async getOrderbyID(data: number) {
    return await this.clientOrder.send('OrderbyID', data);
  }
  async SaveOrder(data) {
    return this.clientOrder.send('SaveOrder', data);
  }
  async deleteOrderbyID(data: number) {
    return await this.clientOrder.send('DelOrder', data);
  }
  async getGenerateOrderID() {
    return await this.clientOrder.send('getGenerateOrderID','');
  }
  
}
