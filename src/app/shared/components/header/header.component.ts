import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { LanguageService } from '../../../core/services/language.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { computed, Signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  totalItems!: Signal<number>;
  subtotal!: Signal<number>;
  constructor(
    public authService: AuthService,
    public cartService: CartService,
    public languageService: LanguageService,
    private router: Router
  ) {
    this.totalItems = this.cartService.totalItems;
    this.subtotal = this.cartService.subtotal;
  }

  navItems = [
    {
      label: 'HEADER.NAV.ALL_PRODUCTS',
      subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
    },
    {
      label: 'HEADER.NAV.ELECTRONICS',
      subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
    },
    {
      label: 'HEADER.NAV.MOBILES',
      subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
    },
    {
      label: 'HEADER.NAV.Cameras',
      subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
    },
    {
      label: 'HEADER.NAV.Digital_Watches',
      subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
    },
    {
      label: 'HEADER.NAV.Digita_Cameras',
      subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
    },
    {
      label: 'HEADER.NAV.ACCESSORIES',
      subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
    },
    {
      label: 'HEADER.NAV.MONITORS',
      subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
    },
    {
      label: 'HEADER.NAV.ELECTRONICS',
      subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
    },
    {
      label: 'HEADER.NAV.HEADPHONES',
      subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
    }
  ];

  toggleLanguage() {
    const currentLang = this.languageService.currentLanguage();
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    this.languageService.setLanguage(nextLang);
  }
  logout(): void {
    this.authService.logout();
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }
}
