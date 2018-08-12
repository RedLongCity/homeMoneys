import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'redloEventField'
})
export class EventFieldPipe implements PipeTransform {

  relations: { name: string, alias: string, placeholder: string }[] = [
    {name: 'type', alias: 'Тип', placeholder: 'Введите тип...'},
    {name: 'amount', alias: 'Сумма', placeholder: 'Введите сумму...'},
    {name: 'category', alias: 'Категория', placeholder: 'Введите категорию...'},
    {name: 'date', alias: 'Дата', placeholder: 'Введите дату...'}
  ];

  transform(value: string, type?: string): string {
    const result = this.relations.find(rel => rel.name === value);
    if (result) {
      switch (type) {
        case 'plc':
          return result.placeholder;
        default:
          return result.alias;
      }
    } else {
      switch (type) {
        case 'plc':
          return 'Поиск...';
        default:
          return 'Default';
      }
    }
  }
}
