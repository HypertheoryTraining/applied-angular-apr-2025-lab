import {
  Component,
  ChangeDetectionStrategy,
  isDevMode,
  inject,
} from '@angular/core';
import { DevBlockComponent } from '@app-shared/components/dev-block';
import { BookStore } from '../services/book-store';
import { SmartDatePipe } from '../pipes/smart-date-pipe';
export type BookApiEntity = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: string;
};

@Component({
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DevBlockComponent, SmartDatePipe],
  template: `
    <div class="overflow-x-auto">
      <table class="table-pin-rows table-md">
        <!-- head -->
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>AUTHOR</th>
            <th>YEAR</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          @for (book of bookstore.entities().values(); track book.id) {
            <tr>
              <th>{{ book.id }}</th>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.year | smartDate }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>

    @defer (when isDev) {
      <app-dev-block>
        {{ bookstore.loading() ? 'Loading...' : 'Loaded' }}
        {{ bookstore.error() ? bookstore.error() : '' }}
      </app-dev-block>
    }
  `,

  styles: ``,
})
export class ListComponent {
  isDev = isDevMode();
  bookstore = inject(BookStore);
}
