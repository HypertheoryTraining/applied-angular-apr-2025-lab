import { JsonPipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  resource,
  isDevMode,
} from '@angular/core';
import { DevBlockComponent } from '@app-shared/components/dev-block';
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
  imports: [DevBlockComponent, JsonPipe],
  template: `
    <p>Book list</p>

    @defer (when isDev) {
      <app-dev-block>
        {{ books.isLoading() ? 'Loading...' : 'Loaded' }}
        {{ books.error() ? books.error() : '' }}

        {{ books.value() | json }}
      </app-dev-block>
    }
  `,

  styles: ``,
})
export class ListComponent {
  isDev = isDevMode();
  books = resource<BookApiEntity[], unknown>({
    loader: () => fetch('/api/books').then((res) => res.json()),
  });
}
