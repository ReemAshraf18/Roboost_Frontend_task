import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from '../products/product-detail/product-detail.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductsService } from './services/products.service';
import { SharedModule } from '../../shared/shared.module';
import { PriceFormatPipe } from "../../shared/pipes/price-format.pipe";
import { AuthGuard } from '../../core/guards/auth.guard';
import { FilterPipe } from "./filter.pipe";

const routes: Routes = [
  { path: '', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: ':id', component: ProductDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductFilterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FilterPipe,
],
  providers: [ProductsService],
})
export class ProductsModule { }
