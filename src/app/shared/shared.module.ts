import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { HeaderComponent } from './components/header/header.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { PriceFormatPipe } from './pipes/price-format.pipe';

@NgModule({
  declarations: [
    LanguageSwitcherComponent,
    HeaderComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    PriceFormatPipe,
    HttpClientModule,
    TranslateModule,
  ],
  exports: [
    LanguageSwitcherComponent,
    HeaderComponent,
    ProductCardComponent,
    PriceFormatPipe,
    CommonModule,
    TranslateModule
  ]
})
export class SharedModule { }
