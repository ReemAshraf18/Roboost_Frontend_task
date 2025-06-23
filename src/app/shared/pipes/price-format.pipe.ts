import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {
  constructor(private languageService: LanguageService) {}
  transform(value: number): string {
    if (this.languageService.currentLanguage() === 'ar') {
      return `${value.toFixed(2)} ر.س`;
    }
    return `$${value.toFixed(2)}`;
  }

}
