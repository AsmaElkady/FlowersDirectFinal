import type { IProduct } from "./productType";

export interface ICartProduct extends IProduct {
  quantity: number;
  totalPrice: number;
  total: number;
}
export interface ICart {
  cartItems: ICartProduct[];
  totalQuantity: number;
  totalPrice: number;
}

export interface IUserState {
  userData: null;
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

//  Slice Interface & Initial State

export interface CartState {
  cart: {
    cartItems: ICartProduct[];
    totalQuantity: number;
    totalPrice: number;
  };
  loading: boolean;
  error: string | null;
}
