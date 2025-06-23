import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page/cart-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { PriceFormatPipe } from "../../shared/pipes/price-format.pipe";
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes : Routes = [
  {
    path: 'cart', component: CartPageComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    CartPageComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    PriceFormatPipe,
    RouterModule.forChild(routes)
]
})
export class CartModule { }
