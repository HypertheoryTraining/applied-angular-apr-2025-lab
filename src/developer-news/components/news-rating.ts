import {
  Component,
  ChangeDetectionStrategy,
  signal,
  input,
  output,
} from '@angular/core';
import { NewsLinkModel } from '../types';

@Component({
  selector: 'app-news-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="flex gap-2">
      <label class="label">
        <input
          type="checkbox"
          [checked]="linkRead() === false"
          (click)="toggleLinkRead()"
          class="toggle"
        />
        {{ readPrompt() }}
      </label>

      @if (linkRead()) {
        <div class="rating">
          @for (rating of linkRatings; track rating) {
            <input
              type="radio"
              (click)="linkRating.set(rating)"
              [name]="'rating-' + rating"
              class="mask mask-star-2 bg-green-500"
              [attr.aria-label]="rating + ' star'"
            />
          }
        </div>
      }

      @if (linkHidden()) {
        <button
          class="btn btn-circle btn-warning btn-sm"
          (click)="toggleHidden()"
        >
          -
        </button>
      } @else {
        <button
          class="btn btn-circle btn-success btn-sm"
          (click)="toggleHidden()"
        >
          +
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class NewsRatingComponent {
  link = input.required<NewsLinkModel>();
  readPrompt = input('Link Read');

  linkHasBeenRead = output<string>();

  linkRead = signal(false);

  linkRating = signal<1 | 2 | 3 | 4 | 5>(1);
  linkRatings = [1, 2, 3, 4, 5] as const;

  toggleHidden() {
    this.linkHidden.update((h) => !h);
  }
  toggleLinkRead() {
    this.linkRead.update((r) => !r);
    if (this.linkRead()) {
      this.linkHasBeenRead.emit(this.link().id);
    }
  }

  linkHidden = signal(false);
}
