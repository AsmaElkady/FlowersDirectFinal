export interface IProduct {
    id?: number;
    name: string;
    desc: string;
    image: string;
    color: string;
    category: string;
    price: number;
    rating?: number;
    isFavorite?: boolean;
    totalQuantity: number;
}
