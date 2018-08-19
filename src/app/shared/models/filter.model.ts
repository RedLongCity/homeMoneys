import {Category} from './category.model';

export class Filter {
  constructor(public categories: Category[],
              public types: string[],
              public dateBegin: Date,
              public dateFinish: Date) {
  }
}
