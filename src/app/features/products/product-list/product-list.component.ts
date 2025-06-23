import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CartService } from '../../cart/services/cart.service';
@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  categories: string[] = [];
  isLoading = true;
  constructor(private productsService: ProductsService, private cartService: CartService
) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.isLoading = false;
      }
    });
  }

   loadCategories(): void {
    this.productsService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}
