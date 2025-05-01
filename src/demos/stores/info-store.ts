import {
  patchState,
  signalStore,
  watchState,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { withDevtools } from '@angular-architects/ngrx-toolkit';

type InfoState = {
  email: string;
  phone: string;
};
export const InfoStore = signalStore(
  withDevtools('InfoStore'),
  withState<InfoState>({
    email: '',
    phone: '',
  }),
  withMethods((store) => {
    return {
      setEmail: (email: string) => patchState(store, { email }),
      setPhone: (phone: string) => patchState(store, { phone }),
    };
  }),
  withHooks({
    onInit(store) {
      const savedInfo = localStorage.getItem('info');
      if (savedInfo) {
        const state = JSON.parse(savedInfo) as InfoState;
        patchState(store, state);
      }

      watchState(store, (state) => {
        localStorage.setItem('info', JSON.stringify(state));
      });
    },
  }),
);
