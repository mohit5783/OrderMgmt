import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductModule, 
    MongooseModule.forRoot('mongodb+srv://Mongohit:P@55w0rd1@cluster0.o2kkk.mongodb.net/order-pay-db?retryWrites=true&w=majority',{
      autoCreate: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
