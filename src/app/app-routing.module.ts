import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
   { 
    path: 'products', 
    loadChildren: () => import('../app/features/products/products.module').then(m => m.ProductsModule)
  },
  { 
    path: 'auth', 
    loadChildren: () => import('../app/features/auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: 'cart', 
    loadChildren: () => import('../app/features/cart/cart.module').then(m => m.CartModule)
  },
    { path: '**', redirectTo: '/home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
