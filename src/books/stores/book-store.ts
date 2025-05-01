import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { BookApiEntity } from '../pages/list';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const SORT_BY_VALUES = ['title', 'author', 'year'] as const;

type SortByValues = (typeof SORT_BY_VALUES)[number];
type BookListState = {
  sortBy: SortByValues;
};

export const BookListStore = signalStore(
  withEntities<BookApiEntity>(),
  withState<BookListState>({
    sortBy: 'title',
  }),
  withProps(() => {
    return {
      sortByValues: SORT_BY_VALUES,
    };
  }),
  withMethods((store) => {
    const client = inject(HttpClient);
    return {
      setSortBy: (sortBy: SortByValues) => {
        patchState(store, { sortBy });
      },
      load: rxMethod<void>(
        pipe(
          switchMap(() =>
            client
              .get<BookApiEntity[]>('/api/books')
              .pipe(tap((b) => patchState(store, setEntities(b)))),
          ),
        ),
      ),
    };
  }),
  withComputed((store) => {
    return {
      sortedBooks: computed(() => {
        return store.entities().sort((a, b) => {
          if (store.sortBy() == 'year') {
            return a.year - b.year;
          } else {
            const aProp = String(a[store.sortBy()]).toLowerCase();
            const bProp = String(b[store.sortBy()]).toLowerCase();
            if (aProp < bProp) {
              return -1;
            } else if (aProp > bProp) {
              return 1;
            } else {
              return 0;
            }
          }
        });
      }),
    };
  }),
  withHooks({
    onInit(store) {
      store.load();
    },
  }),
);
