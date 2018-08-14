import {Pipe, PipeTransform} from '@angular/core';
import {Event} from '../models/event.model';
import {Category} from '../models/category.model';

@Pipe({
  name: 'redloFilter'
})
export class FilterPipe implements PipeTransform {

  constructor() {
  }

  categories: Category[];

  transform(items: Event[], value: string, field: string, categories: Category[]): Event[] {
    if (!value || !field) {
      return items;
    }
    if (field === 'type') {
      return items.filter((i) => {
        return (i['type'] === 'outcome' ? 'расход' : 'доход').toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });
    }

    if (field === 'category') {
      return items.filter((i) => {
        return categories
          .find((c) => c.id === i.category)
          .name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });
    }

    return items.filter((f) => {
      return f[field].toString().toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

}
