import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { BookApiEntity } from '../pages/list';
import { pipe, switchMap, tap } from 'rxjs';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { Library } from './book-service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export const BookStore = signalStore(
  withEntities<BookApiEntity>(),
  withState({
    loading: false,
    error: null as string | null,
    sortOptions: {
      title: false,
      author: false,
      year: false,
    },
    currentlySortedBy: 'title' as SortByType,
  }),
  withDevtools('Books'),
  withMethods((store) => {
    const library = inject(Library);
    return {
      _loadBooks: rxMethod<boolean>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((defaultSort = false) =>
            library.getBooks().pipe(
              tap((books) => {
                patchState(store, { loading: false }, setEntities(books));
                if (defaultSort) {
                  const sorted = books.sort((a, b) =>
                    a.title.localeCompare(b.title),
                  );
                  patchState(store, setEntities(sorted));
                }
              }),
              tap(() => console.log('Done Loading Books.')),
            ),
          ),
        ),
      ),
      toggleSortOption: (sortBy: SortByType) => {
        patchState(store, {
          sortOptions: {
            ...store.sortOptions(),
            [sortBy]: !store.sortOptions()[sortBy],
          },
        });
      },
      setSortOption: (sortBy: SortByType) => {
        patchState(store, { currentlySortedBy: sortBy });
      },
    };
  }),
  withComputed((store) => {
    return {
      totalBooks: computed(() => store.entities().length),
      oldestBookDate: computed(
        () =>
          store.entities().reduce((x, y) => (x.year <= y.year ? x : y)).year,
      ),
      newestBookDate: computed(
        () =>
          store.entities().reduce((x, y) => (x.year >= y.year ? x : y)).year,
      ),
      avgPages: computed(() => {
        const totalPages = store
          .entities()
          .flatMap((book) => book.pages)
          .reduce((sum, pages) => sum + pages, 0);
        return totalPages / store.entities().length;
      }),
      sortedBooks: computed(() => {
        const sortBy = store.currentlySortedBy();
        const descending = store.sortOptions()[sortBy]; // Indicates descending order if true
        return store
          .entities()
          .slice()
          .sort((a, b) => {
            let comparison: number;
            if (sortBy === 'year') {
              comparison = a[sortBy] - b[sortBy]; // Numeric sort for year
            } else {
              comparison = a[sortBy].localeCompare(b[sortBy]); // String sort for title or author
            }
            return descending ? -comparison : comparison;
          });
      }),
    };
  }),

  withHooks({
    onInit(store) {
      console.log('Loading books');
      store._loadBooks(true);
    },
    onDestroy() {
      console.log('The Bookstore was destroyed');
    },
  }),
);
export type SortByType = 'title' | 'author' | 'year';
