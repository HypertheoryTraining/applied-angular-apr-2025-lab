import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CounterStore } from '../stores/counter-store';

@Component({
  selector: 'app-counter-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="join">
      @for (by of store.byValues; track by) {
        <button
          [disabled]="store.by() === by"
          (click)="store.setBy(by)"
          class="btn join-item"
        >
          {{ by }}
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class PrefsComponent {
  store = inject(CounterStore);
}
