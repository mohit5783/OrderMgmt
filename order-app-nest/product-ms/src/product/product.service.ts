import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './product.model';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('PRODUCTS') private readonly ProductModel : Model<ProductDocument>
    ) { }

    async getAllProducts(){
        return this.ProductModel.find().exec();
    }
}
