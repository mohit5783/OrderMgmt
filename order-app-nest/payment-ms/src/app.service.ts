import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPaymentConfirmation(): boolean {
    return Math.random() >= 0.5;
  }
}
