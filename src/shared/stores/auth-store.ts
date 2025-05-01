import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
// Note - this is obviously fake. Use cookies, or OAUTH2, OIDC, or something else in a real app.
export const AuthStore = signalStore(
  withState({
    isLoggedIn: false,
    userName: null as string | null,
  }),
  withMethods((store) => {
    const router = inject(Router);
    return {
      login: () =>
        patchState(store, { isLoggedIn: true, userName: 'Bob Smith' }),
      logout: () => {
        // but also redirect them to the dashboard or something...
        patchState(store, { isLoggedIn: false, userName: null });
        router.navigate(['/']);
      },
    };
  }),
);
