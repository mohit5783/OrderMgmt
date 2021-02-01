import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Item } from 'src/app/models/item.model';
import { OrderItem } from 'src/app/models/order-item.model';
import { ItemService } from 'src/app/services/item.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  formData: OrderItem | undefined;
  itemList: Item[] | undefined;
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private itemService: ItemService,
    private orderSevice: OrderService) { }

  ngOnInit() {
    this.itemService.getItemList().then(res => this.itemList = res as Item[]);
    if (this.data.orderItemIndex == -1)
      this.formData = {
        OrderItemID: 0,
        OrderID: this.data.OrderID,
        ItemID: 0,
        ItemName: '',
        Price: 0,
        Quantity: 0,
        Total: 0
      }
    else {
      if (this.orderSevice.orderItems != null)
        this.formData = Object.assign({}, this.orderSevice.orderItems[this.data.orderItemIndex]);
    }
  }

  updatePrice(ctrl: any) {
    if (ctrl.selectedIndex == 0 && this.formData != null) {
      this.formData.Price = 0;
      this.formData.ItemName = '';
    }
    else {
      if (this.formData != null && this.itemList != null) {
        this.formData.Price = this.itemList[ctrl.selectedIndex - 1].Price;
        this.formData.ItemName = this.itemList[ctrl.selectedIndex - 1].Name;
      }
    }
    this.updateTotal();
  }

  updateTotal() {
    if (this.formData != null)
      this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == -1 && this.orderSevice.orderItems != null)
        this.orderSevice.orderItems.push(form.value);
      else {
        if (this.orderSevice.orderItems != null)
          this.orderSevice.orderItems[this.data.orderItemIndex] = form.value;
      }
      this.dialogRef.close();
    }
  }

  validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.ItemID == 0)
      this.isValid = false;
    else if (formData.Quantity == 0)
      this.isValid = false;
    return this.isValid;
  }
}
