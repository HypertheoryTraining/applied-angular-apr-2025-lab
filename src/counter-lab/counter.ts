import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CounterStore } from './stores/counter-store';

@Component({
  selector: 'app-counter',
  providers: [CounterStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="flex gap-4">
      <a routerLink="ui" class="link">UI</a>
      <a routerLink="prefs" class="link">Prefs</a>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class CounterComponent {}
