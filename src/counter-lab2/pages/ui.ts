import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FizzbuzzComponent } from '../components/fizzbuzz';
import { Counter2Store } from '../services/counter2.store';
import { inject } from '@angular/core';

@Component({
  selector: 'app-counter2-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FizzbuzzComponent],
  template: ` <div>
    <button
      class="btn btn-primary"
      (click)="store.decrement()"
      [disabled]="store.isDecrementDisabled()"
    >
      -
    </button>
    <span>{{ store.counter() }}</span>
    <button class="btn btn-primary" (click)="store.increment()">+</button>
    <app-counter-fizzbuzz />
  </div>`,
  styles: ``,
})
export class UiComponent {
  store = inject(Counter2Store);
  counter = signal(0);
}
