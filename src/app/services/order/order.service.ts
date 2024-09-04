import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderResponse } from '../../interfaces/order.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/api/orders`;

  constructor(private http: HttpClient) { }

  getOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(this.apiUrl);
  }

  getOrdersDetails(orderId: number | string | null): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(this.apiUrl + `/${orderId}`);
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + `?shippingAddress=${orderData.shippingAddress}&shippingName=${orderData.shippingName}&shippingCost=${orderData.shippingCost}`, orderData);
  }
}