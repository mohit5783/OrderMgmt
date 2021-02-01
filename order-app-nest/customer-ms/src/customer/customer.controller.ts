import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
    constructor(private _customerService: CustomerService ){}
    @MessagePattern('AllCustomers')
    getAllCustomers(){
        return this._customerService.getAllCustomers();
    }
}
