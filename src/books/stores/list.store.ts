import {
  setLoaded,
  setLoading,
  withCallState,
  withDevtools,
} from '@angular-architects/ngrx-toolkit';
import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { BookApiEntity, BooksStatsModel } from '../pages/types';

const SORT_FIELDS = ['title', 'author', 'year'] as const;
type SortFields = (typeof SORT_FIELDS)[number];
type BookListState = {
  sortBy: SortFields;
  selectedBookId: string | null;
};
export const BookListStore = signalStore(
  withEntities<BookApiEntity>(),
  withDevtools('BookListStore'),
  withCallState(),
  withState<BookListState>({
    sortBy: 'title',
    selectedBookId: null,
  }),
  withProps(() => ({
    sortByValues: SORT_FIELDS,
  })),
  withComputed((store) => {
    return {
      selectedBook: computed(() => {
        const selectedBookId = store.selectedBookId();
        const books = store.entityMap();
        return books[selectedBookId || ''] || null;
      }),

      bookStats: computed(() => {
        const books = store.entities();
        return generateStats(books);
      }),
      sortedBooks: computed(() => {
        const books = store.entities();
        const sortBy = store.sortBy();
        return sortBooks(books, sortBy);
      }),
    };
  }),
  withMethods((store) => {
    const client = inject(HttpClient);
    return {
      setSelectedBookId: (bookId: string) =>
        patchState(store, { selectedBookId: bookId }),
      _load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading())),
          switchMap(() =>
            client
              .get<BookApiEntity[]>('/api/books')
              .pipe(tap((b) => patchState(store, setLoaded(), setEntities(b)))),
          ),
        ),
      ),
      setSortBy: (sortBy: SortFields) => patchState(store, { sortBy }),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  }),
);
function generateStats(books: BookApiEntity[]) {
  const totalBooks = books.length;
  const earliestYear = Math.min(...books.map((b) => b.year));
  const latestYear = Math.max(...books.map((b) => b.year));
  const averagePages =
    books.reduce((acc, b) => acc + (b.pages || 0), 0) / totalBooks;
  return {
    totalBooks,
    earliestYear,
    latestYear,
    averagePages,
  } as BooksStatsModel;
}

function sortBooks(
  books: BookApiEntity[],
  sortBy: SortFields,
): BookApiEntity[] {
  return books.sort((a, b) => {
    if (sortBy === 'year') {
      // Sort numerically for the year
      return a.year - b.year;
    } else {
      // Sort alphabetically for title or author (case-insensitive)
      const valueA = String(a[sortBy]).toLowerCase();
      const valueB = String(b[sortBy]).toLowerCase();
      if (valueA < valueB) {
        return -1;
      } else if (valueA > valueB) {
        return 1;
      } else {
        return 0;
      }
    }
  });
}
