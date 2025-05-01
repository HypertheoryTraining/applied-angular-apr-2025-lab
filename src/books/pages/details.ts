import {
  Component,
  ChangeDetectionStrategy,
  input,
  effect,
  inject,
} from '@angular/core';
import { BookListStore } from '../stores/list.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    @if (store.selectedBook()) {
      @let book = store.selectedBook()!;
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">{{ book.title }}</h2>
          <p>Author: {{ book.author }}</p>
          <p>Country: {{ book.country }}</p>
          <p>Language: {{ book.language }}</p>
          <p>Pages: {{ book.pages }}</p>
          <p>Year: {{ book.year }}</p>
        </div>
      </div>
    } @else {
      <p>No Selected Book</p>
    }

    <a class="btn btn-primary" [routerLink]="['/books']">Back</a>
  `,
  styles: ``,
})
export class DetailsComponent {
  id = input.required<string>();
  store = inject(BookListStore);
  constructor() {
    effect(() => {
      const id = this.id();
      if (id) {
        this.store.setSelectedBookId(id);
      }
    });
  }
}
