import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BookListStore } from '../stores/book-store';

@Component({
  selector: 'app-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div class="join">
    @for (sortBy of store.sortByValues; track sortBy) {
      <button
        [disabled]="store.sortBy() === sortBy"
        (click)="store.setSortBy(sortBy)"
        class="btn join-item"
      >
        {{ sortBy }}
      </button>
    }
  </div>`,
  styles: ``,
})
export class PrefsComponent {
  store = inject(BookListStore);
}
