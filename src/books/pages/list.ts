import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  isDevMode,
} from '@angular/core';
import { BookListStore } from '../stores/list.store';
import { RouterLink } from '@angular/router';

@Component({
  providers: [],
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleCasePipe, RouterLink],
  template: `
    <p>Book list</p>

    <div class="join">
      @for (sort of store.sortByValues; track sort) {
        <button
          class="btn join-item"
          [disabled]="store.sortBy() === sort"
          (click)="store.setSortBy(sort)"
        >
          {{ sort | titlecase }}
        </button>
      }
    </div>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      @for (book of store.sortedBooks(); track book.id) {
        <div
          class="card ring-2 ring-base-300 rounded-box gap-4 m-4 hover:ring-blue-300"
        >
          <div class="card-body">
            <h2 class="card-title">
              <a class="link" [routerLink]="['..', 'details', book.id]">
                {{ book.title }}
              </a>
            </h2>
            <p>Author: {{ book.author }}</p>
            <p>Year: {{ book.year }}</p>
          </div>
        </div>
      }
    </div>
  `,

  styles: ``,
})
export class ListComponent {
  store = inject(BookListStore);
  isDev = isDevMode();
}
