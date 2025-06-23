import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Route, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<any>(null);

  constructor(private http: HttpClient,
    private router: Router) {
    this.checkAuthState();
  }
  login(credentials: { email: string, password: string }): Observable<any> {
      return this.http.post('https://dummyjson.com/auth/login', credentials).pipe(
      tap((response: any) => {
        localStorage.setItem(this.AUTH_KEY, response.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(response));
        this.isAuthenticated.set(true);
        this.currentUser.set(response);
        this.router.navigate(['/']);
      })
    );
  }
  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  private checkAuthState(): void {
    const token = localStorage.getItem(this.AUTH_KEY);
    const userData = localStorage.getItem(this.USER_KEY);
    if (token && userData) {
      this.isAuthenticated.set(true);
      this.currentUser.set(JSON.parse(userData));
    }
  }

  getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}
  
}
