import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FizzbuzzComponent } from '../components/fizzbuzz';
import { CounterStore } from '../stores/counter-store';

@Component({
  selector: 'app-counter-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FizzbuzzComponent],
  template: `
    <div>
      <button
        [disabled]="store.decrementDisabled()"
        (click)="store.decrement()"
        class="btn btn-primary"
      >
        -
      </button>
      <span>{{ store.current() }}</span>
      <button (click)="store.increment()" class="btn btn-primary">+</button>
    </div>

    <app-counter-fizzbuzz />
  `,
  styles: ``,
})
export class UiComponent {
  store = inject(CounterStore);
}
