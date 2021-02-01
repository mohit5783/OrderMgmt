export class Order {
    constructor(public OrderID: number,
                public OrderNo: string,
                public CustomerID: number,
                public PMethod: string,
                public GTotal: number,
                public DeletedOrderItemIDs: string) { }
}
