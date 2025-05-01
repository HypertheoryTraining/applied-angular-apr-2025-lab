import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BookListStore } from '../stores/list.store';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-books-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
  template: `
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">Stats</h2>
        @let stats = store.bookStats();
        <p>Total Books: {{ stats.totalBooks }}</p>
        <p>Earliest Year: {{ stats.earliestYear }}</p>
        <p>Latest Year: {{ stats.latestYear }}</p>
        <p>Average Pages: {{ stats.averagePages | number: '1.0-0' }}</p>
      </div>
    </div>
  `,
  styles: ``,
})
export class StatsComponent {
  store = inject(BookListStore);
}
