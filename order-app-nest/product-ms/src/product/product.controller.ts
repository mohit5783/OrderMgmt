import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private _productService: ProductService ){}
    @MessagePattern('AllProducts')
    getAllProducts(){
        return this._productService.getAllProducts();
    }
}
