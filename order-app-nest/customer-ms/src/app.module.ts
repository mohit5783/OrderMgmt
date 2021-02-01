import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Mongohit:P@55w0rd1@cluster0.o2kkk.mongodb.net/order-pay-db?retryWrites=true&w=majority',{
      autoCreate: true
    }),
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
