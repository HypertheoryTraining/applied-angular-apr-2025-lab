import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

const COUNT_BY_VALUES = [1, 3, 5] as const;
type CountBy = (typeof COUNT_BY_VALUES)[number];
type Counter2State = {
  counter: number;
  by: CountBy;
  countByValues: typeof COUNT_BY_VALUES;
};

type CounterPersisted = Omit<Counter2State, 'countByValues'>;

export const Counter2Store = signalStore(
  withState<Counter2State>({
    counter: 0,
    by: 1,
    countByValues: COUNT_BY_VALUES,
  }),
  withMethods((store) => {
    return {
      increment: () =>
        patchState(store, { counter: store.counter() + store.by() }),
      decrement: () =>
        patchState(store, { counter: store.counter() - store.by() }),
      setBy: (by: CountBy) => patchState(store, { by }),
    };
  }),
  withComputed((store) => {
    return {
      isDecrementDisabled: computed(() => store.counter() <= 0),
    };
  }),
  withHooks({
    onInit(store) {
      const savedPersistedState = localStorage.getItem('counter2');
      if (savedPersistedState !== null) {
        const persistedState: CounterPersisted =
          JSON.parse(savedPersistedState);
        patchState(store, {
          counter: persistedState.counter,
          by: persistedState.by,
        });
      }
      watchState(store, (state) => {
        const persistedState: CounterPersisted = {
          counter: state.counter,
          by: state.by,
        };
        localStorage.setItem('counter2', JSON.stringify(persistedState));
      });
    },
  }),
);
