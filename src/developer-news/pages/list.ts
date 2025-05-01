import {
  ChangeDetectionStrategy,
  Component,
  effect,
  resource,
  signal,
} from '@angular/core';
import { NewsLinkModel } from '../types';
import { NewsRatingComponent } from '../components/news-rating';

@Component({
  selector: 'app-developer-news-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NewsRatingComponent],
  template: `
    @if (links.isLoading()) {
      <span class="loading loading-spinner text-warning"></span>
    } @else {
      @if (links.error()) {
        <div class="alert alert-warning">Can't load your data!</div>
      } @else {
        <ul>
          @for (link of links.value(); track link.id) {
            <li class="card card-border bg-base-100 w-96">
              @if (latestRead() === link.id) {
                <span class="relative flex size-3">
                  <span
                    class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
                  ></span>
                  <span
                    class="relative inline-flex size-3 rounded-full bg-sky-500"
                  ></span>
                </span>
              }
              <div class="card-body">
                <p class="card-title text-accent">
                  {{ link.title }}
                </p>
                <a [href]="link.href" class="link" target="_blank">{{
                  link.href
                }}</a>
                @if (link.description) {
                  <p>
                    {{ link.description }}
                  </p>
                }
                <div class="card-actions">
                  <app-news-rating
                    [link]="link"
                    readPrompt="Mark As Read"
                    (linkHasBeenRead)="onLinkRead($event)"
                  />
                </div>
              </div>
            </li>
          } @empty {
            <p>There are not links to display. Sorry. Try again later.</p>
          }
        </ul>
      }
    }
  `,
  styles: ``,
})
export class ListComponent {
  latestRead = signal<string | null>(null);

  constructor() {
    // effect is do something behind the scenes if the signal changes.
    effect(() => {
      const readId = this.latestRead();

      if (readId) {
        setTimeout(() => {
          this.latestRead.set(null);
        }, 1500);
      }
    });
  }

  links = resource<NewsLinkModel[], unknown>({
    loader: () =>
      fetch('https://some-api.company-that-does-not-exist.com/news-links').then(
        (res) => res.json(),
      ),
  });

  onLinkRead(id: string) {
    console.log('the link has been read', id);
    this.latestRead.set(id);
  }
}
