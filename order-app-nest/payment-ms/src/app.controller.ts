import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('PAYMENT_SERVICE') private readonly client: ClientProxy
    ) {}

  @MessagePattern('PayConfirm')
  async getPaymentConfirmation(): Promise<boolean> {
    return this.appService.getPaymentConfirmation();
  }
}
