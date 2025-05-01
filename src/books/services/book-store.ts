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
import {
  setEntities,
  updateEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { Library } from './book-service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export const BookStore = signalStore(
  withEntities<BookApiEntity>(),
  withState({
    loading: false,
    error: null as string | null,
  }),
  withDevtools('Books'),
  withMethods((store) => {
    const library = inject(Library);
    return {
      _loadBooks: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            library.getBooks().pipe(
              tap((books) =>
                patchState(store, { loading: false }, setEntities(books)),
              ),
              tap(() => console.log('Done Loading Books.')),
            ),
          ),
        ),
      ),
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
    };
  }),

  withHooks({
    onInit(store) {
      console.log('Loading books');
      store._loadBooks();
    },
    onDestroy() {
      console.log('The Bookstore was destroyed');
    },
  }),
);
