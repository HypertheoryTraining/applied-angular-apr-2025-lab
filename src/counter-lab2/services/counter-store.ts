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
type CounterState = {
  currentVal: number;
  by: CountBy;
  countByValues: typeof COUNT_BY_VALUES;
};

type CountPersistenceState = Omit<CounterState, 'countByValues'>;

export const CounterStore = signalStore(
  withState<CounterState>({
    currentVal: 0,
    by: 1,
    countByValues: COUNT_BY_VALUES,
  }),

  withMethods((store) => {
    return {
      increment: () =>
        patchState(store, { currentVal: store.currentVal() + store.by() }),
      decrement: () =>
        patchState(store, { currentVal: store.currentVal() - store.by() }),
      setBy: (by: CountBy) => patchState(store, { by }),
    };
  }),

  withComputed((store) => {
    return {
      disableDecrement: computed(() => store.currentVal() - store.by() < 0),
      fizzBuzz: computed(() =>
        store.currentVal() === 0
          ? ''
          : store.currentVal() % 15 === 0
            ? 'FizzBuzz'
            : store.currentVal() % 3 === 0
              ? 'Fizz'
              : store.currentVal() % 5 === 0
                ? 'Buzz'
                : '',
      ),
    };
  }),
  withHooks({
    onInit(store) {
      const savedState = localStorage.getItem('counter');

      if (savedState !== null) {
        const persistanceState = JSON.parse(
          savedState,
        ) as CountPersistenceState;
        patchState(store, persistanceState);
      }

      watchState(store, (state) => {
        const persistanceState: CountPersistenceState = {
          currentVal: state.currentVal,
          by: state.by,
        };
        localStorage.setItem('counter', JSON.stringify(persistanceState));
      });
    },
  }),
);
