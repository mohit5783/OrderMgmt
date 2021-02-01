import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrderItem } from 'src/app/models/order-item.model';
import { Order } from 'src/app/models/order.model';
import { resolveRaise } from 'xstate/lib/actions';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  customerList: Customer[] | undefined;
  isValid: boolean = true;

  constructor(public service: OrderService,
    private dialog: MatDialog,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    let orderID = this.currentRoute.snapshot.paramMap.get('id');
    if (orderID == null)
      this.resetForm();
    else {
      this.service.getOrderByID(parseInt(orderID)).then((res) => {
        this.service.formData = res;
        this.service.orderItems = res.OrderItems;
      });
    }

    this.customerService.getCustomerList().then(res => this.customerList = res as Customer[]);
  }

  async resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    let coid = 0;
    await this.service.getGenerateOrderID().then((v) => coid = v as number);

    this.service.formData = {
      OrderID: coid,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerID: 0,
      PMethod: '',
      GTotal: 0,
      DeletedOrderItemIDs: ''
    };
    this.service.orderItems = [];
  }


  AddOrEditOrderItem(orderItemIndex: number, OrderID: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    });
  }


  onDeleteOrderItem(orderItemID: number, i: number) {
    if (this.service.formData != null && this.service.orderItems != null) {
      if (orderItemID != null)
        this.service.formData.DeletedOrderItemIDs += orderItemID + ",";
      this.service.orderItems.splice(i, 1);
      this.updateGrandTotal();
    }
  }

  updateGrandTotal() {
    if (this.service.formData != null && this.service.orderItems != null) {
      this.service.formData.GTotal = this.service.orderItems.reduce((prev, curr) => {
        return prev + curr.Total;
      }, 0);
      this.service.formData.GTotal = parseFloat(this.service.formData.GTotal.toFixed(2));
    }
  }

  validateForm() {
    this.isValid = true;
    if (this.service.formData != null && this.service.formData.CustomerID == 0)
      this.isValid = false;
    else if (this.service.orderItems != null && this.service.orderItems.length == 0)
      this.isValid = false;
    return this.isValid;
  }


  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.service.saveOrUpdateOrder().subscribe(res => {
        this.resetForm();
        this.toastr.success('Submitted Successfully', 'Order App.');
        this.router.navigate(['/orders']);
      })
    }
  }


}
