import {
  Component,
  ChangeDetectionStrategy,
  computed,
  resource,
} from '@angular/core';
import { BookApiEntity } from './list';

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div>
    <p>Total Count at {{ books.value()?.length }}</p>
    <p>Average number of pages per book: {{ averagePagesPerBook() }}</p>
    <p>Total number of pages: {{ totalPagesAllBooks() }}</p>
    <p>Most Classical: {{ earliestBookYear() }}</p>
    <p>Most Trending: {{ mostRecentBookYear() }}</p>
  </div>`,
  styles: ``,
})
export class StatsComponent {
  books = resource<BookApiEntity[], unknown>({
    loader: () => fetch('/api/books').then((res) => res.json()),
  });

  totalPagesAllBooks = computed(() => {
    const books = this.books.value();
    if (books) {
      return books.reduce((a, c) => a + c.pages, 0);
    } else {
      return 0;
    }
  });

  averagePagesPerBook = computed(() => {
    const books = this.books.value();
    if (books) {
      return books.reduce((a, c) => a + c.pages, 0) / books.length;
    } else {
      return 0;
    }
  });

  earliestBookYear = computed(() => {
    return this.books.value()?.sort((a, b) => a.year - b.year)[0].year;
  });

  mostRecentBookYear = computed(() => {
    return this.books.value()?.sort((a, b) => b.year - a.year)[0].year;
  });
}
