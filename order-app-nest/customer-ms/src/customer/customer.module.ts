import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from './customer.controller';
import { CustomerSchema } from './customer.model';
import { CustomerService } from './customer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'CUSTOMERS',
      schema: CustomerSchema
    }]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
