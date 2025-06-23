import { Component, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProductsService } from '../../products/services/products.service';
import { CartService } from '../../cart/services/cart.service';
@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any;
  relatedProducts: any[] = [];
  isLoading = true;
  currentImageIndex = 0;


  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProductDetails(+productId);
    }  }

  loadProductDetails(id: number): void {
    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loadRelatedProducts(product.category);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load product details', err);
        this.isLoading = false;
      }
    });
  }

  loadRelatedProducts(category: string): void {
    this.productsService.getProductsByCategory(category).subscribe({
      next: (products) => {
        this.relatedProducts = products.filter(p => p.id !== this.product.id).slice(0, 4);
      }
    });
  }
  addToCart(): void {
    this.cartService.addToCart(this.product);
  }

  changeImage(index: number): void {
    this.currentImageIndex = index;
  }

}
