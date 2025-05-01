import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Counter2Store } from '../services/counter2.store';

@Component({
  selector: 'app-counter-fizzbuzz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      @switch (fizzBuzz()) {
        @case ('Fizz') {
          <span class="text-success">Fizz is divisible by 3</span>
        }
        @case ('Buzz') {
          <span class="text-accent">Buzz is divisible by 5</span>
        }
        @case ('FizzBuzz') {
          <span class="text-warning">FizzBuzz is divisible by 3 and 5</span>
        }
      }
    </div>
  `,
  styles: ``,
})
export class FizzbuzzComponent {
  store = inject(Counter2Store);

  fizzBuzz = computed(() => {
    const value = this.store.counter();

    if (value > 0) {
      return value % 15 === 0
        ? 'FizzBuzz'
        : value % 3 === 0
          ? 'Fizz'
          : value % 5 === 0
            ? 'Buzz'
            : '';
    } else {
      return ' ';
    }
  });
}
