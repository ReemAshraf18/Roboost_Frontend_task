import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Route, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<any>(null);
  private API_URL = 'https://dummyjson.com/users';

  constructor(private http: HttpClient,
    private router: Router) {
    this.checkAuthState();
  }
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.get<any>(this.API_URL).pipe(
      map(response => {
        const users = response.users;
        const matchedUser = users.find(
          (user: any) =>
            user.username === credentials.username &&
            user.password === credentials.password
        );

        if (matchedUser) {
          const fakeToken = 'fake-token-' + matchedUser.id;
          this.isAuthenticated.set(true);
          return { token: fakeToken, user: matchedUser };
        } else {
          throw new Error('Invalid username or password');
        }
      }),
      catchError(err => {
        return throwError(() => ({
          error: { message: err.message || 'Login failed' }
        }));
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
const token = localStorage.getItem(this.AUTH_KEY) || sessionStorage.getItem(this.AUTH_KEY);
    const userData = localStorage.getItem(this.USER_KEY);
    if (token && userData) {
      this.isAuthenticated.set(true);
      this.currentUser.set(JSON.parse(userData));
    }
  }

  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }
  register(userData: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post('https://dummyjson.com/users/add', userData);
  }



}
