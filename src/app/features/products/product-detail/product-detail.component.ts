// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { Product } from '../../../core/models/product.interface';

// import { ProductsService } from '../../products/services/products.service';
// import { CartService } from '../../cart/services/cart.service';
// @Component({
//   selector: 'app-product-detail',
//   standalone: false,
//   templateUrl: './product-detail.component.html',
//   styleUrl: './product-detail.component.css'
// })

// export class ProductDetailComponent implements OnInit {
//   product!: Product;
//   Math!: Math;
//   relatedProducts: any[] = [];
//   isLoading = true;
//   currentImageIndex = 0;
//   error: string | null = null;
//   selectedImage: string = '';
//   quantity: number = 1;


//   constructor(
//     private route: ActivatedRoute,
//     private productsService: ProductsService,
//     private cartService: CartService,
//     private http: HttpClient
//   ) {}

//   ngOnInit(): void {
//     const productId = this.route.snapshot.paramMap.get('id');
//     if (productId) {
//       this.loadProductDetails(+productId);
//     }  }

//   loadProductDetails(id: number): void {
//     this.productsService.getProductById(id).subscribe({
//       next: (product) => {
//         this.product = product;
//         this.loadRelatedProducts(product.category);
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('Failed to load product details', err);
//         this.isLoading = false;
//       }
//     });
//   }

//   loadRelatedProducts(category: string): void {
//     this.productsService.getProductsByCategory(category).subscribe({
//       next: (products) => {
//         this.relatedProducts = products.filter(p => p.id !== this.product.id).slice(0, 4);
//       }
//     });
//   }
//   addToCart(): void {
//     this.cartService.addToCart(this.product);
//   }

//   changeImage(index: number): void {
//     this.currentImageIndex = index;
//   }

// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../products/services/products.service';
import { CartService } from '../../cart/services/cart.service';
import { DetailsProduct, Product, Review } from '../../../core/models/product.interface';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product!: DetailsProduct;
  relatedProducts: Product[] = [];
  isLoading = true;
  error: string | null = null;
  Math = Math;

  currentImageIndex = 0;
  selectedImage: string = '';
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    private http: HttpClient,
    private router: Router


  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    const productId = params.get('id');
    if (productId) {
      this.isLoading = true;
      this.loadProductDetails(+productId);
    }
  });
  }

  loadProductDetails(id: number): void {
    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.selectedImage = product.thumbnail || product.images[0];
        this.loadRelatedProducts(product.category);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Failed to load product details', err);
        this.isLoading = false;
      }
    });
  }

  loadRelatedProducts(category: string): void {
    this.productsService.getProductsByCategory(category).subscribe({
      next: (products) => {
        this.relatedProducts = products
          .filter(p => p.id !== this.product.id)
          .slice(0, 4);
      },
      error: (err) => {
        console.error('⚠️ Failed to load related products', err);
      }
    });
  }

  changeImage(index: number): void {
    this.currentImageIndex = index;
    this.selectedImage = this.product.images[index];
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    this.cartService.addToCart(this.product); // You can pass quantity if supported
  }
  goToProduct(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
}
