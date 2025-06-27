import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CartService } from '../../cart/services/cart.service';
import { Product } from '../../../core/models/product.interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  brands: string[] = [];
  selectedCategories: string[] = [];
  selectedBrands: string[] = [];
  selectedColors: string[] = [];
  minPrice: number = 0;
  maxPrice: number = 5000;
  currentMinPrice: number = 0;
  currentMaxPrice: number = 5000;
  minRating: number = 0;
  isLoading = true;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('✅ ProductListComponent Constructor');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['q'];

      if (query) {
        this.productsService.searchProducts(query).subscribe({
          next: (res) => {
            this.products = res.products || [];
            this.afterLoadProducts();
          },
          error: (err) => {
            console.error('Search load failed', err);
            this.products = [];
          }
        });
      } else {
        this.loadProducts();
      }
    });

    this.loadCategories();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (res) => {

        this.products = res;
        console.log('🟢 products loaded:', this.products);

        this.afterLoadProducts();
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.isLoading = false;
      }
    });
  }

  afterLoadProducts(): void {
    console.log('🟢 products loaded:', this.products);
    this.extractFilters();
    this.setPriceRange();
    this.applyFilters();
    this.isLoading = false;
  }

  loadCategories(): void {
    this.productsService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  extractFilters() {
    this.categories = [...new Set(this.products.map(p => p.category))];
    this.brands = [...new Set(this.products.map(p => p.brand))];
  }

  setPriceRange() {
    const prices = this.products.map(p => p.price);
    this.minPrice = Math.floor(Math.min(...prices));
    this.maxPrice = Math.ceil(Math.max(...prices));
    this.currentMinPrice = this.minPrice;
    this.currentMaxPrice = this.maxPrice;
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const categoryMatch = this.selectedCategories.length === 0 || this.selectedCategories.includes(product.category);
      const brandMatch = this.selectedBrands.length === 0 || this.selectedBrands.includes(product.brand);
      const priceMatch = product.price >= this.currentMinPrice && product.price <= this.currentMaxPrice;
      const ratingMatch = product.rating >= this.minRating;

      return categoryMatch && brandMatch && priceMatch && ratingMatch;
    });
  }

  onCategoryChange(category: string, event: any) {
    event.target.checked
      ? this.selectedCategories.push(category)
      : this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    this.applyFilters();
  }

  onBrandChange(brand: string, event: any) {
    event.target.checked
      ? this.selectedBrands.push(brand)
      : this.selectedBrands = this.selectedBrands.filter(b => b !== brand);
    this.applyFilters();
  }

  onColorChange(color: string, event: any) {
    event.target.checked
      ? this.selectedColors.push(color)
      : this.selectedColors = this.selectedColors.filter(c => c !== color);
    this.applyFilters();
  }

  onPriceChange() {
    this.applyFilters();
  }

  onRatingChange(rating: number) {
    this.minRating = rating;
    this.applyFilters();
  }

  getDiscountedPrice(product: Product): number {
    return product.price - (product.price * product.discountPercentage / 100);
  }


}
