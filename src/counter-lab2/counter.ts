import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-counter-lab2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: ` <div class="flex gap-4">
      <a routerLink="ui" class="link">UI</a>
      <a routerLink="prefs" class="link">Prefs</a>
    </div>
    <router-outlet />`,
  styles: ``,
})
export class CounterLabComponent {}
