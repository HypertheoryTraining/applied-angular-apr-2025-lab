import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BookListStore } from './stores/book-store';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  providers: [BookListStore],
  template: `
    <div class="flex gap-4">
      <a routerLink="list" class="link">List</a>
      <a routerLink="stats" class="link">Stats</a>
      <a routerLink="prefs" class="link">Prefs</a>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class BooksComponent {}
