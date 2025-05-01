import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CounterStore } from '../stores/counter-store';

@Component({
  selector: 'app-counter-fizzbuzz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      @switch (fizzBuzz()) {
        @case ('Fizz') {
          <span class="text-success">Fizz (is evenly divisible by 3)</span>
        }
        @case ('Buzz') {
          <span class="text-accent">Buzz (is evenly divisible by 5)</span>
        }
        @case ('FizzBuzz') {
          <span class="text-warning"
            >FizzBuzz (is evenly divisible by 3 and 5)</span
          >
        }
      }
    </div>
  `,
  styles: ``,
})
export class FizzbuzzComponent {
  store = inject(CounterStore);
  fizzBuzz = computed(() => {
    const value = this.store.current();
    if (value === 0) {
      return '';
    }
    if (value % 3 === 0 && value % 5 === 0) {
      return 'FizzBuzz';
    } else if (value % 3 === 0) {
      return 'Fizz';
    } else if (value % 5 === 0) {
      return 'Buzz';
    }
    return '';
  });
}
