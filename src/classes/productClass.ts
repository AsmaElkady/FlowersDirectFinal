// import { useGetProductsQuery } from "../api/productApi";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../redux/slices/productSlice";
import type { IProduct } from "../types/productType";

export class Product implements IProduct {
  public id?: number;
  public name: string;
  public desc: string;
  public image: string;
  public color: string;
  public category: string;
  public price: number;
  public rating: number;
  public isFavorite: boolean;
  public totalQuantity: number;

  constructor(
    name: string,
    price: number,
    image: string,
    desc: string,
    category: string,
    color: string,
    rating: number,
    isFavorite: boolean,
    totalQuantity: number,
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.desc = desc;
    this.category = category;
    this.color = color;
    this.rating = rating;
    this.isFavorite = isFavorite;
    this.totalQuantity = totalQuantity;
  }

  static getProducts() {
    return fetchProducts();
  }

  static addProduct(product: Product) {
    return addProduct(product);
  }

  static deleteProduct(id: number) {
    return deleteProduct(id);
  }

  static updateProduct(product: Product) {
    return updateProduct(product);
  }
}
