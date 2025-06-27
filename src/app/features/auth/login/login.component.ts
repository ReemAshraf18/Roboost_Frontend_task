import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private fb: FormBuilder;
  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router,

  ) {
    this.fb = fb;
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [true]
    });
  }
  loginForm: ReturnType<FormBuilder['group']>;

  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    const savedUsername = localStorage.getItem('savedUsername');
    console.log('Loaded saved credentials:', savedUsername);

    if (savedUsername) {
      this.loginForm.patchValue({
        username: savedUsername,
        rememberMe: true
      });
    }
  }





  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { username, password, rememberMe } = this.loginForm.value;

    this.authService.login({ username: username!, password: password! }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.isLoading = false;

        if (rememberMe) {
          localStorage.setItem('savedUsername', username!);
          console.log('Saved to localStorage:', localStorage.getItem('savedUsername'));

        } else {
          sessionStorage.setItem('auth_token', res.token);
        }

        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('user_data', JSON.stringify(res.user));
        this.authService.isAuthenticated.set(true);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}