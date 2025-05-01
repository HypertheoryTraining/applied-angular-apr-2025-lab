import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smartNum',
})
//TODO: Make this work nicely with millions.
export class SmartNumber implements PipeTransform {
  transform(value: number): string {
    if (value > 1000 && value < 1_000_000) {
      return (value / 1000).toFixed(2) + 'K';
    } else {
      return value.toString();
    }
  }
}
