import { Routes } from '@angular/router';
import { DemosComponent } from './demos';
import { isLoggedInGuard } from './guards';
import { InfoComponent } from './pages/info';
import { SharedStateComponent } from './pages/shared-state';
import { SignalDemosComponent } from './pages/signal-demos';
import { GolfStore } from './services/golf-store';
export const DEMO_ROUTES: Routes = [
  {
    path: '',
    component: DemosComponent,
    providers: [GolfStore], // scope - is only anywhere in the demos route. but will live after the route is left
    children: [
      {
        path: 'signals',
        component: SignalDemosComponent,
      },
      {
        path: 'shared-state',
        canActivate: [isLoggedInGuard],
        component: SharedStateComponent,
      },
      {
        path: 'info',

        component: InfoComponent,
      },
    ],
  },
];
