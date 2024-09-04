import { Pageable, Sort } from "./pageable.interface";

export interface ProductResponse {
    content: Product[];
    pageable: Pageable;
    totalElements: number;
    totalPages: number;
    last: boolean;
    numberOfElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: Sort;
    empty: boolean;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    imgUrl: string;
    price: number;
}
