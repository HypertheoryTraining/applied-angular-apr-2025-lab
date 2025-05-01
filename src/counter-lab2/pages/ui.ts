import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../services/counter-store';

@Component({
  selector: 'app-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <button
        class="btn btn-primary"
        (click)="store.decrement()"
        [disabled]="store.disableDecrement()"
      >
        -
      </button>
      <span>{{ store.currentVal() }}</span>
      <button class="btn btn-primary" (click)="store.increment()">+</button>
    </div>

    <div>
      <p>{{ store.fizzBuzz() }}</p>
    </div>
  `,
  styles: ``,
})
export class UiComponent {
  store = inject(CounterStore);
}
