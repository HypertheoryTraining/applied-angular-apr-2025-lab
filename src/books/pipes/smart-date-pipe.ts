import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smartDate',
})
export class SmartDatePipe implements PipeTransform {
  transform(value: number): string {
    if (value > 0) return `${value}`;
    const positiveValue = Math.abs(value);
    return `${positiveValue} BC`;
  }
}
