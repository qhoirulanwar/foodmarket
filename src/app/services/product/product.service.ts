import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse } from '../../interfaces/product.interface';
import { ErrorHandlingService } from '../error/error-handling.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/products`;

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { }

  getProducts(page: number = 1, size: number = 10, sort?: string): Observable<ProductResponse | any> {
    let params = new HttpParams()
      .set('size', size.toString())
      .set('page', page.toString());

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<ProductResponse>(this.apiUrl, { params })
  }
}