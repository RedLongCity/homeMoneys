import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'redloCategoryColor'
})
export class CategoryColorPipe implements PipeTransform {

  transform(value: { outcome: number, total: number }, ...args: any[]): any {
    const rel = value.total > 0 ? value.outcome / value.total : 1;
    if (rel > 0.4 && rel < 0.6) {
      return 'info';
    }
    if (rel > 0.6) {
      return 'success';
    }
    if (rel > 0.25 && rel < 0.4) {
      return 'warning';
    }
    if (rel < 0.25) {
      return 'danger';
    }
  }
}
