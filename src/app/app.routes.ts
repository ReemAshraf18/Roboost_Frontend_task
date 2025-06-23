import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { AuthModule } from './features/auth/auth.module';
import { CartModule } from './features/cart/cart.module';
import { ProductsModule } from './features/products/products.module';
import { SharedModule } from './shared/shared.module';

export const routes: Routes = [

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

  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
class AppRoutingModule { }
