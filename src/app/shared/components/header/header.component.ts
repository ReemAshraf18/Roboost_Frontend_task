// import { Component, inject, ViewEncapsulation } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule, Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../../../core/services/auth.service';
// import { CartService } from '../../../features/cart/services/cart.service';
// import { LanguageService } from '../../../core/services/language.service';
// import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
// import { computed, Signal } from '@angular/core';
// import { Product, ProductsService } from '../../../features/products/services/products.service';
// @Component({
//   selector: 'app-header',
//   standalone: false,
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.css',
//   encapsulation: ViewEncapsulation.None
// })
// export class HeaderComponent {
//   searchTerm: string = '';
//   searchResults: Product[] = [];
//   IsAuthenticated!: boolean;

//   totalItems!: Signal<number>;
//   subtotal!: Signal<number>;
//   getusername: any;
//   constructor(
//     public authService: AuthService,
//     public cartService: CartService,
//     public languageService: LanguageService,
//     private productsService: ProductsService,
//     private router: Router
//   ) {
//     this.totalItems = this.cartService.totalItems;
//     this.subtotal = this.cartService.subtotal;
//     this.IsAuthenticated = this.authService.isAuthenticated();
//     console.log("Is Auth", this.IsAuthenticated);
    
//     if(this.IsAuthenticated)
//     {
//       this.getusername = localStorage.getItem('savedUsername')
//     }

//   }
//   get isUserLoggedIn(): boolean {
//   return this.authService.isLoggedIn();
// }

//   navItems = [
//     {
//       label: 'HEADER.NAV.ALL_PRODUCTS',
//       subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
//     },
//     {
//       label: 'HEADER.NAV.ELECTRONICS',
//       subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
//     },
//     {
//       label: 'HEADER.NAV.MOBILES',
//       subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
//     },
//     {
//       label: 'HEADER.NAV.Cameras',
//       subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
//     },
//     {
//       label: 'HEADER.NAV.Digital_Watches',
//       subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
//     },
//     {
//       label: 'HEADER.NAV.Digita_Cameras',
//       subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
//     },
//     {
//       label: 'HEADER.NAV.ACCESSORIES',
//       subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
//     },
//     {
//       label: 'HEADER.NAV.MONITORS',
//       subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
//     },
//     {
//       label: 'HEADER.NAV.ELECTRONICS',
//       subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
//     },
//     {
//       label: 'HEADER.NAV.HEADPHONES',
//       subItems: ['HEADER.NAV.SUBCATEGORY1', 'HEADER.NAV.SUBCATEGORY2', 'HEADER.NAV.SUBCATEGORY3']
//     }
//   ];
//   onSearch() {
//     if (!this.searchTerm.trim()) return;


//     this.productsService.searchProducts(this.searchTerm).subscribe({
//       next: (res) => {
//         this.searchResults = res.products;
//         console.log('Search results:', this.searchResults);
//         this.router.navigate(['/products'], {
//           queryParams: { q: this.searchTerm }
//         });
//       },
//       error: (err) => {
//         console.error('Search error', err);
//       }
//     });
//   }
//   toggleLanguage() {
//     const currentLang = this.languageService.currentLanguage();
//     const nextLang = currentLang === 'ar' ? 'en' : 'ar';
//     this.languageService.setLanguage(nextLang);
//   }
//   logout(): void {
//     this.authService.logout();
//   }

//   navigateToCart(): void {
//     this.router.navigate(['/cart']);
//   }
// }

import { Component, ViewEncapsulation, computed, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { LanguageService } from '../../../core/services/language.service';
import { Product, ProductsService } from '../../../features/products/services/products.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  searchTerm: string = '';
  searchResults: Product[] = [];

  totalItems!: Signal<number>;
  subtotal!: Signal<number>;

  username = computed(() => this.authService.currentUser()?.firstName ?? null);

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    public languageService: LanguageService,
    private productsService: ProductsService,
    private router: Router
  ) {
    this.totalItems = this.cartService.totalItems;
    this.subtotal = this.cartService.subtotal;
  }

  // ✅ isAuthenticated signal مباشرة
  get isUserLoggedIn(): boolean {
    return this.authService.isAuthenticated();
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

  onSearch() {
    if (!this.searchTerm.trim()) return;

    this.productsService.searchProducts(this.searchTerm).subscribe({
      next: (res) => {
        this.searchResults = res.products;
        this.router.navigate(['/products'], {
          queryParams: { q: this.searchTerm }
        });
      },
      error: (err) => {
        console.error('Search error', err);
      }
    });
  }

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

