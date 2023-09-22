//-------------Order Interfaces

export interface IItemObj {
  id: string;
  description: string;
  price: number;
  quantity: number;
}

export interface IOrderCompleted {
  orderId: string;
  customer: string;
  item: IItemObj[];
  orderDate: string;
  totalPrice: number;
}
export interface IOrders {
  orderId: string;
  orderDate: string;
  totalPrice: number;
  item: [];
  customer: string;
}

export interface IOrdersItems {
  description: string;
  id: string;
  price: number;
  quantity: number;
}

//-------------Product Interfaces

export interface IProducts {
  id: string;
  title: string;
  description: string;
  img: string[];
  price: number;
  quantity: number;
  default_price: string;
}

export interface IProductInCart {
  title: string;
  price: number;
  quantity: number;
}
