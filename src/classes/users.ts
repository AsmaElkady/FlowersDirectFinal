import {
  getAllUsers,
  getUserByID,
  getUserByEmail,
  updateUserPassword,
  removeUser,
  updateUser,
} from "../redux/api/userAPI";
import type { ICart } from "../types/cart";
import type { ICustomer } from "../types/auth";
import { adminEmail } from "../constants/main";

type userType = {
  id?: number;
  email: string;
  username: string;
};

export class User implements userType {
  public id?: number;
  public email: string;
  public username: string;
  protected password: string;
  constructor(email: string, username: string, password: string, id?: number) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.id = id;
  }

  getUser(id: number) {
    return getUserByID(id);
    // return usersAPI.useGetUserByIdQuery(id);
  }
}

export class Admin extends User implements userType {
  constructor(email: string, username: string, password: string, id?: number) {
    super(email, username, password, id);
  }

  static checkAdmin(email: string) {
    if (email == adminEmail) {
      return { status: true };
    } else {
      return { status: false, msg: "Not valid user" };
    }
  }

  static editUserPass({ id, password }: Pick<ICustomer, "id" | "password">) {
    return updateUserPassword({ id, password });
  }

  static deleteUser(id: number) {
    return removeUser(id);
  }

  static viewUsers(query?: string) {
    return getAllUsers(query);
  }
}

export class Customer extends User implements userType {
  public cart: ICart;
  public favorites: [];
  public orders: [];
  constructor(
    email: string,
    username: string,
    password: string,
    cart: ICart,
    favorites: [],
    orders: [],
    id?: number
  ) {
    super(email, username, password, id);
    this.cart = cart;
    this.favorites = favorites;
    this.orders = orders;
  }

  static forgetPass(email: string) {
    if (email != "admin@admin.com") {
      return getUserByEmail(email);
    }
  }

  static editProfile(user: Partial<ICustomer>) {
    return updateUser(user);
  }

  addOrder() {}

  addCart() {}

  addFavorite() {}
}
