import type { IProduct } from "./productType";


export interface IFav {
    favItem:IProduct [],
    loading: boolean,
    error: string | null,
}