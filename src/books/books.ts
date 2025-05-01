import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex gap-4">
      <a routerLink="list" class="link">List</a>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class BooksComponent {}
