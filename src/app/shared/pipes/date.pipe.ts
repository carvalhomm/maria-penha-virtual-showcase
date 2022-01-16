import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(value: Date): string {
    return data.toLocaleDateString('pt-br', {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric'
    });
  }
}