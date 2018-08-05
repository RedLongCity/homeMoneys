import {Category} from './category.model';

export class Event {
  constructor(public type: string,
              public amount: number,
              public category: Category,
              public date: Date,
              public description: string,
              public id?: number) {
  }
}
