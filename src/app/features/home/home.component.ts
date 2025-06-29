import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../products/services/products.service';
import { ProductsService } from '../products/services/products.service';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductsService
  ) { }
  products: Product[] = [];
  categories: string[] = [];
  displayedCategories: string[] = [];
  currentPage = 0;
  itemsPerPage = 8;

  ngOnInit(): void {
    this.productService.getProducts(0, 8).subscribe(response => {
      this.products = response.products;
    });
    this.productService.getCategories().subscribe((data: string[]) => {
      this.categories = data;
      this.updateDisplayedCategories();
    });
  }

  goToProduct(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
  updateDisplayedCategories(): void {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedCategories = this.categories.slice(start, end);
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.itemsPerPage < this.categories.length) {
      this.currentPage++;
      this.updateDisplayedCategories();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplayedCategories();
    }


  }
}