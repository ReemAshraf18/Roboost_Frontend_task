import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean{
      console.log('AuthGuard - isAuthenticated?', this.authService.isAuthenticated());
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.createUrlTree(['auth/login']);
    return false;
  }
}