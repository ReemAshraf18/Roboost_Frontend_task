import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-product-filter',
  standalone: false,
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {
  @Input() categories: string[]= [];
  @Output() filterChange = new EventEmitter<any>();
  selectedCategory = '';
  priceRange = { min: 0, max: 1000 };
  minRating = 0;

  applyFilters(): void {
    this.filterChange.emit({
      category: this.selectedCategory,
      priceRange: this.priceRange,
      minRating: this.minRating
    });
  }

  resetFilters(): void {
    this.selectedCategory = '';
    this.priceRange = { min: 0, max: 1000 };
    this.minRating = 0;
    this.applyFilters();
  }

}
