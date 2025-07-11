import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: any): any[] {
    if (!items || !field || value === undefined) {
      return items;
    }
    
    return items.filter(item => {
      if (field === 'rating') {
        return item[field] >= value;
      }
      return item[field] === value;
    });
  }
}