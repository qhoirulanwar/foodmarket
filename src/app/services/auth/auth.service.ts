import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { LoginResponse } from '../../interfaces/user.interface';
import { ErrorHandlingService } from '../error/error-handling.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { }

  login(email: string, password: string): Observable<LoginResponse> | any {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: LoginResponse) => {
        this.isLoggedIn = true;
        this.saveToken(response);
      }),
      catchError((error) => {
        let errorMessage = "Terjadi kesalahan server, silahkan coba beberapa saat lagi";

        if (error.error.error == "Unauthorized") {
          errorMessage = "Email atau password salah";
        }

        return this.errorHandlingService.handleError(errorMessage);
      })
    );
  }

  register(userData: { name: string; email: string; password: string }): Observable<LoginResponse> | any {
    return this.http.post(`${this.apiUrl}/register`, userData)
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    localStorage.removeItem('cart');
  }

  private saveToken(response: LoginResponse) {
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('user_info', JSON.stringify({
      id: response.id,
      email: response.email
    }));
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUserInfo(): any {
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
  }
}
