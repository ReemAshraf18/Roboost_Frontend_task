import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  constructor(
    public cartService: CartService,
    private router: Router
  ) {}
    updateQuantity(productId: number, event: any): void {
    const quantity = +event.target.value;
    this.cartService.updateQuantity(productId, quantity);
  }
  
  continueShopping(): void {
    this.router.navigate(['/products']);
  }

    proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  } 

  removeItemFromCart(itemId: number): void {
    this.cartService.removeFromCart(itemId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  navigateToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
  
}
