import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../services/counter-store';

@Component({
  selector: 'app-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `<p>Preferences</p>
    <div class="join">
      @for (val of store.countByValues(); track val) {
        <button
          (click)="store.setBy(val)"
          [disabled]="store.by() === val"
          class="btn join-item"
        >
          {{ val }}
        </button>
      }
    </div>`,
  styles: ``,
})
export class PrefsComponent {
  store = inject(CounterStore);
}
