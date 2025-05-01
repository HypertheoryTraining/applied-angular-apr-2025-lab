import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { GolfStore } from '../services/golf-store';

@Component({
  providers: [],
  selector: 'app-demos-signals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Signals Demos Coming Soon</p>
    <p>{{ message() }}</p>

    <p>There are {{ numberOfLettersInMessage() }} letters in that.</p>
    <button (click)="embiggenate()" class="btn btn-primary">Embiggenate</button>
    <button class="btn btn-warning">Does Nothing</button>

    <div>
      <p>Golf Stroke Counter</p>
      <div>
        <span>Current: {{ store.current() }}</span>
        <div>
          <button (click)="takeAShot()" class="btn btn-circle btn-success">
            +
          </button>

          @if (store.underPar()) {
            <p>You are under par</p>
          }
          @if (store.overPar()) {
            <p>You are at par</p>
          }
          @if (store.atPar()) {
            <p>In the sweet spot!</p>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class SignalDemosComponent {
  takeAShot() {
    this.store.takeAStroke();
  }
  // never ever use "raw" data like this again.
  message = signal('This is the original message');

  numberOfLettersInMessage = computed(() => this.message().length);

  embiggenate() {
    // this.message.set(this.message().toUpperCase());
    this.message.update((old) => old.toUpperCase());
  }

  // consider STRONGLY avoiding "constructor injection" and using the angular inject to inject services.
  store = inject(GolfStore);
  constructor() {
    effect(() => {
      setInterval(() => this.message.update((m) => m + 'x'), 1000);
    });
  }
}
