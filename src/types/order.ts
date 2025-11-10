import type { IProduct } from "./productType";

interface OrderItem extends IProduct {
  quantity: number;
}

export interface Order {
  id: string;
  userId: number;
  items: OrderItem[];
  totalPrice: number;
  address: string;
  note?: string;
  phone?: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}

interface orderState {
  orders: Order[];
  loading: boolean;
}

export type { orderState, OrderItem };
