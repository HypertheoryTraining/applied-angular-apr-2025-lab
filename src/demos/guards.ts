import { inject } from '@angular/core';
import { AuthStore } from '@app-shared/stores/auth-store';

export const isLoggedInGuard = () => inject(AuthStore).isLoggedIn();
