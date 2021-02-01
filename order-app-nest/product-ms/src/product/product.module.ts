import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './product.model';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'PRODUCTS',
      schema: ProductSchema
    }]),
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
