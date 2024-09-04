import { Product } from "./product.interface";

export interface CartResponse {
    id: number;
    items: Item[];
    total: number;
    totalQuantity: number
}

export interface Item {
    productId: number;
    productName: string;
    productImgUrl: string;
    price: number;
    quantity: number;
    total: number;
}

export interface AddReduceCartResponse {
    id: number;
    product: Product;
    quantity: number;
}