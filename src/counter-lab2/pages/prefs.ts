import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Counter2Store } from '../services/counter2.store';

@Component({
  selector: 'app-counter-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>Click the desired increment value.</p>
    <div class="join">
      @for (value of store.countByValues(); track value) {
        <button
          [disabled]="store.by() === value"
          (click)="store.setBy(value)"
          class="btn join-item"
        >
          {{ value }}
        </button>
      }
    </div>`,
  styles: ``,
})
export class PrefsComponent {
  store = inject(Counter2Store);
}
