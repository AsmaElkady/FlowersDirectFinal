import type { ICart } from "./cart";

export type IUser = {
  id?: number;
  email: string;
  username: string;
  password: string;
};
export type ILogin = Pick<IUser, "email" | "password">;

export interface ISignup extends ILogin {
  username: string;
  re_password: string;
}

export type IForgetPass = Pick<IUser, "email">;
export interface IResetPass {
  password: string;
  re_password: string;
}

export interface IAuthSlice {
  token: string;
  user?: ICustomer;
  admin?: IUser;
  status: string;
  isLoading: boolean;
  isError: boolean;
}

export type ICustomer = {
  id?: number;
  email: string;
  password?: string;
  username: string;
  cart?: ICart;
  favorites?: [];
  orders: [];
};

export interface IChangePasswordProps {
  id?: number;
  checkResetStatus: (result: CallBack) => void;
}

export interface CallBack {
  status: boolean;
  msg: string;
}

export interface IEditProfileProps {
  user: ICustomer;
  checkEditStatus: (result: CallBack) => void;
}

export interface IProfile {
  username: string;
  email: string;
}
