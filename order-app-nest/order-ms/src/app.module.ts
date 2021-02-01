import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Mongohit:P@55w0rd1@cluster0.o2kkk.mongodb.net/order-pay-db?retryWrites=true&w=majority',{
      autoCreate: true
    }),
    ClientsModule.register([
      { name: 'ORDER_SERVICE', transport: Transport.TCP },
    ]),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
