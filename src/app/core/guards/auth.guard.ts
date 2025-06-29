import { Injectable, signal } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

   private _isAuthenticated = signal<boolean>(false);
  isAuthenticated = this._isAuthenticated.asReadonly();


  constructor(private authService: AuthService, private router: Router) 
  {
    const token = localStorage.getItem('auth_token');
    this._isAuthenticated.set(!!token);
  }
  login(token: string) {
    localStorage.setItem('access_token', token);
    this._isAuthenticated.set(true);
  }

  logout() {
    localStorage.removeItem('access_token');
    this._isAuthenticated.set(false);
  }

  canActivate(): boolean{
      console.log('AuthGuard - isAuthenticated?', this.authService.isAuthenticated());
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.createUrlTree(['auth/login']);
    return false;
  }
}