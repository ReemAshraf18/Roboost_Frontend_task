import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../products/services/products.service';

interface CartItem
{
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  totalItems = computed(() => this.cartItems().reduce((total, item) => total + item.quantity, 0));
  subtotal = computed(() => this.cartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0));

  constructor() 
  {
    this.loadCart();
  }
  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cartItems().find(item => item.product.id === product.id);
    
    if (existingItem) {
      this.cartItems.update(items =>
        items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      this.cartItems.update(items => [...items, { product, quantity }]);
    }
    
    this.saveCart();
  }

   removeFromCart(productId: number): void {
    this.cartItems.update(items => 
      items.filter(item => item.product.id !== productId)
    );
    this.saveCart();
  }

   updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    
    this.cartItems.update(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
    this.saveCart();
  }
  clearCart(): void {
    this.cartItems.set([]);
    this.saveCart();
  }
  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.set(JSON.parse(savedCart));
    }
  }
  getCartItems(): CartItem[] {
    return this.cartItems();
  }
}
