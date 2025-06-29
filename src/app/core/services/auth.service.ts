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
  private readonly EXPIRATION_KEY = 'token_expiration';

  isAuthenticated = signal<boolean>(false);
  expiration = signal<boolean>(false);
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
          this.currentUser.set(matchedUser);
          const now = new Date().getTime();
          const expiration = now + 24 * 60 * 60 * 1000;
          localStorage.setItem(this.AUTH_KEY, fakeToken);
          localStorage.setItem(this.USER_KEY, JSON.stringify(matchedUser));
          localStorage.setItem(this.EXPIRATION_KEY, expiration.toString());
          this.setAutoLogout();
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
    localStorage.removeItem(this.EXPIRATION_KEY);

    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  private checkAuthState(): void {
    const token = localStorage.getItem(this.AUTH_KEY) || sessionStorage.getItem(this.AUTH_KEY);
    const userData = localStorage.getItem(this.USER_KEY);
    const expiration = localStorage.getItem(this.EXPIRATION_KEY);
    const now = new Date().getTime();

    if (token && userData && expiration && now < +expiration) {
      this.isAuthenticated.set(true);
      this.currentUser.set(JSON.parse(userData));
      this.setAutoLogout();
    }
    else {
      this.logout();
    }
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.AUTH_KEY);
  }
  
  register(userData: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post('https://dummyjson.com/users/add', userData);
  }

  isTokenExpired(): boolean {
    const expiration = localStorage.getItem(this.EXPIRATION_KEY);
    if (!expiration) return true;

    const now = new Date().getTime();
    return now > +expiration;
  }

  setAutoLogout(): void {
    const expiration = +localStorage.getItem('token_expiration')!;
    const now = new Date().getTime();
    const timeout = expiration - now;

    if (timeout > 0) {
      setTimeout(() => {
        this.logout();
      }, timeout);
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}
