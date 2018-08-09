import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'redloCategoryProgress'
})
export class CategoryProgressPipe implements PipeTransform {
  transform(value: { income: number, total: number }, ...args: any[]): any {
    return (value.  total > 0 ? value.income / value.total : 1) * 100 + '%';
  }
}
