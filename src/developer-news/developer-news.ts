import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-developer-news',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex flex-row gap-4">
      <a
        class="link"
        routerLink="list"
        [routerLinkActive]="['text-secondary', 'font-bold']"
        >List Of Links</a
      >
      <a
        class="link"
        routerLink="my-links"
        [routerLinkActive]="['text-secondary', 'font-bold']"
        >My Links</a
      >
    </div>

    <router-outlet />
  `,
  styles: ``,
})
export class DeveloperNewsComponent {}
