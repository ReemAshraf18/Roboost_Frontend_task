import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay, tap } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    if (this.productsCache().length > 0) {
      return new Observable<Product[]>(observer => {
        observer.next(this.productsCache());
        observer.complete();
      });
    }
    return this.http.get<{ products: Product[] }>('https://dummyjson.com/products')
      .pipe(
        map(response => response.products),
        tap((products: Product[]) => this.productsCache.set(products)),
        shareReplay(1)
      );
  }
    getProductById(id: number): Observable<Product> {
    const cachedProduct = this.productsCache().find(p => p.id === id);
    if (cachedProduct) {
      return new Observable(observer => {
        observer.next(cachedProduct);
        observer.complete();
      });
    }

    return this.http.get<Product>(`https://dummyjson.com/products/${id}`);
  }
    getCategories(): Observable<string[]> {
    if (this.categoriesCache().length > 0) {
      return new Observable(observer => {
        observer.next(this.categoriesCache());
        observer.complete();
      });
    }

    return this.http.get<string[]>('https://dummyjson.com/products/categories').pipe(
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
