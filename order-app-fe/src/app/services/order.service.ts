import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderItem } from '../models/order-item.model';
import { Order } from '../models/order.model';
import { environment } from 'src/environments/environment';
import { Machine, actions, interpret, assign } from 'xstate';
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order | undefined;
  orderItems: OrderItem[] | undefined;
  OrderMachine = Machine({
    initial: 'CreatingOrder',
    on: {
      SET_PAYMENT: {
        actions: ['settingPayment']
      },
      SET_CARTSIZE: {
        actions: ['settingCartSize']
      },
      UNSET_PAYMENT: {
        actions: ['unsettingPayment']
      },
      UNSET_CARTSIZE: {
        actions: ['unsettingCartSize']
      },
    },
    context: {
      Payment: false,
      CartSize: false
    },
    states: {
      CreatingOrder: {
        on: {
          Adding: [
            { target: 'OrderCreated', cond: 'isValidCartSize' },
            { target: 'CreatingOrder' }
          ],
        }
      },
      OrderCreated: { on: { OrderSubmitted: 'PaymentApproval' } },
      PaymentApproval: {
        on: {
          Paying: [
            { target: 'PaymentApproved', cond: 'isValidPayment' },
            { target: 'PaymentDeclined' }
          ]
        }
      },
      PaymentDeclined: { on: { CancellingOrder: 'OrderCancelled' } },
      OrderCancelled: { type: 'final' },
      PaymentApproved: { on: { ConfirmingOrder: 'OrderConfirmed' } },
      OrderConfirmed: { on: { DeliveringOrder: 'OrderDelivered' } },
      OrderDelivered: { type: 'final' },

    }
  },
    {
      actions: {
        settingPayment: assign((ctx, e) => {
          ctx.Payment = true;
          ctx.CartSize = ctx.CartSize;
          return ctx;
        }),
        unsettingPayment: assign((ctx, e) => {
          ctx.Payment = false;
          ctx.CartSize = ctx.CartSize;
          return ctx;
        }),
        settingCartSize: assign((ctx, e) => {
          ctx.CartSize = true;
          ctx.Payment = ctx.Payment;
          return ctx;
        }),
        unsettingCartSize: assign((ctx, e) => {
          ctx.CartSize = false;
          ctx.Payment = ctx.Payment;
          return ctx;
        }),
      },
      guards: {
        isValidPayment: (context) => context.Payment === true,
        isValidCartSize: (context) => context.CartSize === true
      }
    }
  );
  OrderFSMService = interpret(this.OrderMachine);

  constructor(private http: HttpClient) {
    var ofsms = this.OrderFSMService;
    ofsms.subscribe((state) => { console.log(state); });
    ofsms.start();
    // ofsms.send('SET_CARTSIZE');
    // ofsms.send('Adding');
    // ofsms.send('OrderSubmitted');
    // ofsms.send('SET_PAYMENT');
    // ofsms.send('Paying');
    // ofsms.send('ConfirmingOrder');
    // ofsms.send('DeliveringOrder');
  }

  saveOrUpdateOrder() {
    var body = {
      ...this.formData,
      OrderItems: this.orderItems
    };
    return this.http.post(environment.apiURL + 'SaveOrder', body);
  }

  getOrderList() {
    return this.http.get(environment.apiURL + 'AllOrders').toPromise();
  }

  getOrderByID(id: number): any {
    return this.http.get(environment.apiURL + 'OrderbyID/' + id).toPromise();
  }

  deleteOrder(id: number) {
    return this.http.delete(environment.apiURL + 'DelOrder/' + id).toPromise();
  }

  getGenerateOrderID() {
    return this.http.get(environment.apiURL + 'getGenerateOrderID').toPromise();
  }
}
