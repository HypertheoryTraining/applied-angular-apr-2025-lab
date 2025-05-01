import { Routes } from '@angular/router';
import { CounterLabComponent } from './counter';
import { UiComponent } from './pages/ui';
import { PrefsComponent } from './pages/prefs';
import { CounterStore } from './services/counter-store';
export const COUNTER_ROUTES_2: Routes = [
  {
    path: '',
    component: CounterLabComponent,
    providers: [CounterStore],
    children: [
      {
        path: 'ui',
        component: UiComponent,
      },
      {
        path: 'prefs',
        component: PrefsComponent,
      },
    ],
  },
];
