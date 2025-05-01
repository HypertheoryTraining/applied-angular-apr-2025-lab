import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

export const GolfStore = signalStore(
  withState({
    current: 0,
    par: 4,
  }),
  withMethods((store) => {
    return {
      takeAStroke: () => patchState(store, { current: store.current() + 1 }),
      reset: () => patchState(store, { current: 0 }),
    };
  }),
  withComputed((store) => {
    return {
      resetDisabled: computed(() => store.current() === 0),
      underPar: computed(() => store.current() < store.par()),
      overPar: computed(() => store.current() > store.par()),
      atPar: computed(() => store.current() == store.par()),
    };
  }),
  withHooks({
    onInit() {
      console.log('The Golf Store Was Created');
    },
    onDestroy() {
      console.log('The Golf Store was destroyed');
    },
  }),
);
