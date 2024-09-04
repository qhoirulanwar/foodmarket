export interface OrderResponse {
    id: number;
    userId: number;
    userEmail: string;
    items: Item[];
    totalAmount: number;
    shippingAddress: string;
    status: string;
    createdAt: Date;
}

export interface OrderCheckoutResponse {
    id: number;
    userId: number;
    userEmail: string;
    items: Item[];
    totalAmount: number;
    shippingAddress: string;
    status: string;
    createdAt: Date;
}

export interface Item {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    imgUrl: string;
}
