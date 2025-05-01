import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GolfStore } from '../services/golf-store';

@Component({
  selector: 'app-shared-state-demo',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Your Current Score is {{ store.current() }}</p>
    <button
      type="button"
      class="btn btn-primary"
      [disabled]="store.resetDisabled()"
      (click)="store.reset()"
    >
      Reset
    </button>
  `,
  styles: ``,
})
export class SharedStateComponent {
  store = inject(GolfStore);
}
