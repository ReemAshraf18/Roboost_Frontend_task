import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { DetailsProduct } from '../../../core/models/product.interface';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}



@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsCache = signal<Product[]>([]);
  private categoriesCache = signal<string[]>([]);
  private detailsCache = signal<DetailsProduct[]>([]);

  constructor(private http: HttpClient) { }

  getProducts(skip: number = 0, limit: number = 30): Observable<{ products: Product[], total: number, skip: number, limit: number }> {
    return this.http.get<{ products: Product[], total: number, skip: number, limit: number }>(
      `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
    ).pipe(
      tap((response) => this.productsCache.set(response.products)),
      shareReplay(1)
    );
  }

  getProductById(id: number): Observable<DetailsProduct> {
    const cachedProduct = this.detailsCache().find(p => p.id === id);
    if (cachedProduct) {
      return new Observable(observer => {
        observer.next(cachedProduct);
        observer.complete();
      });
    }
    return this.http.get<DetailsProduct>(`https://dummyjson.com/products/${id}`);
  }
  getCategories(): Observable<string[]> {
    if (this.categoriesCache().length > 0) {
      return new Observable(observer => {
        observer.next(this.categoriesCache());
        observer.complete();
      });
    }

    return this.http.get<string[]>('https://dummyjson.com/products/category-list').pipe(
      tap(categories => this.categoriesCache.set(categories)),
      shareReplay(1)
    );
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(`https://dummyjson.com/products/category/${category}`).pipe(
      map(response => response.products)
    );
  }
  searchProducts(query: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/products/search?q=${query}`);
  }
}
