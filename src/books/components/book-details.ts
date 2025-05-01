import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { BookApiEntity } from '../pages/list';

@Component({
  selector: 'app-book-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="card bg-base-100 w-96 shadow-sm">
      <div class="card-body">
        <h2 class="card-title">{{ book().title }} by {{ book().author }}</h2>
        <p>
          Id: {{ book().id }}<br />
          Country: {{ book().country }}<br />
          Language: {{ book().language }}<br />
          Page Count: {{ book().pages }}<br />
          Year: {{ book().year }}<br />
          More info: {{ book().link }}
        </p>
      </div>
      <figure>
        <img src="{{ book().imageLink }}" alt="Book" />
      </figure>
    </div>
  `,
  styles: ``,
})
export class BookDetailsComponent {
  book = input.required<BookApiEntity>();
}
