import { Order } from './order.model';

describe('OrderModel', () => {
  it('should be defined', () => {
    expect(new Order()).toBeDefined();
  });
});
