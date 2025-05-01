import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
const BY_VALUES = [1, 3, 5] as const;

type ByValues = (typeof BY_VALUES)[number];

type CounterState = {
  by: ByValues;
  current: number;
};

export const CounterStore = signalStore(
  withState<CounterState>({
    by: 1,
    current: 0,
  }),
  withProps(() => {
    return {
      byValues: BY_VALUES,
    };
  }),
  withMethods((store) => {
    // some magic can happen here.
    return {
      setBy: (by: ByValues) => {
        patchState(store, { by });
      },
      increment: () => {
        patchState(store, { current: store.current() + store.by() });
      },
      decrement: () => {
        patchState(store, { current: store.current() - store.by() });
      },
    };
  }),
  withComputed((store) => {
    return {
      decrementDisabled: computed(() => store.current() - store.by() < 0),
    };
  }),
  withHooks({
    onInit(store) {
      // check to see if the value is in local storage, and if it is,
      const savedState = localStorage.getItem('counter-store');
      if (savedState) {
        // parse it, and patch the state with it.
        const parsedState = JSON.parse(savedState) as CounterState; // Typescript, trust me on this one.
        patchState(store, parsedState);
        // patch the state with it.
      }
      // and then watch the state for changes, and save it.
      watchState(store, (state) => {
        localStorage.setItem('counter-store', JSON.stringify(state));
      });
    },
  }),
);
