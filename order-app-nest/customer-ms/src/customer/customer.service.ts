import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerDocument } from './customer.model';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel('CUSTOMERS') private readonly CustomerModel : Model<CustomerDocument>
    ) { }

    async getAllCustomers(){
        return this.CustomerModel.find().exec();
    }
}
