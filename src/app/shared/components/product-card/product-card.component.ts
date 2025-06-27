import { Component, Input, Output, EventEmitter, input } from '@angular/core';
import { Product } from '../../../features/products/services/products.service';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
  getDiscountedPrice(): number {
    return this.product.price - (this.product.price * this.product.discountPercentage / 100);
  }
  generateStars(): string[] {
    const fullStars = Math.floor(this.product.rating);
    const hasHalfStar = this.product.rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }

    if (hasHalfStar) {
      stars.push('half');
    }

    while (stars.length < 5) {
      stars.push('empty');
    }

    return stars;
  }
  getStockStatus(): string {
    if (this.product.stock > 20) return 'متوفر';
    if (this.product.stock > 5) return 'قليل';
    if (this.product.stock > 0) return 'آخر القطع';
    return 'غير متوفر';
  }

  getStockClass(): string {
    if (this.product.stock > 20) return 'text-success';
    if (this.product.stock > 5) return 'text-warning';
    if (this.product.stock > 0) return 'text-danger';
    return 'text-muted';
  }
}
