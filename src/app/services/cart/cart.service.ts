import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartResponse, AddReduceCartResponse } from '../../interfaces/cart.interface';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { ErrorHandlingService } from '../error/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/api/cart`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private errorHandlingSrvc: ErrorHandlingService
  ) { }

  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(this.apiUrl);
  }

  addToCart(productId: number, quantity: number = 1): Observable<AddReduceCartResponse> {

    const params = new HttpParams()
      .set('productId', productId.toString())
      .set('quantity', quantity.toString());

    return this.http.post<AddReduceCartResponse>(`${this.apiUrl}/add`, null, { params });
  }

  reduceFromCart(productId: number, quantity: number = 1): Observable<AddReduceCartResponse> {
    const params = new HttpParams()
      .set('productId', productId.toString())
      .set('quantity', quantity.toString());

    return this.http.post<AddReduceCartResponse>(`${this.apiUrl}/reduce`, null, { params });
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  }

  // Metode untuk menyimpan keranjang secara lokal
  saveCartLocally(cart: CartResponse) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Metode untuk mengambil keranjang dari penyimpanan lokal
  getLocalCart(): CartResponse | null {
    const cartString = localStorage.getItem('cart');
    return cartString ? JSON.parse(cartString) : null;
  }
}