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
}
