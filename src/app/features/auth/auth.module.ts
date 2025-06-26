import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { AuthService } from '../../core/services/auth.service';
import { ProductDetailComponent } from '../products/product-detail/product-detail.component';
import { RegisterComponent } from './register/register.component';

//route the auth
const routes : Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
