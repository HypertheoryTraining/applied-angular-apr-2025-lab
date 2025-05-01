import { Routes } from '@angular/router';
import { CounterLabComponent } from './counter';
import { UiComponent } from './pages/ui';
import { PrefsComponent } from './pages/prefs';
import { Counter2Store } from './services/counter2.store';
export const COUNTER_ROUTES_2: Routes = [
  {
    path: '',
    component: CounterLabComponent,
    providers: [Counter2Store],
    children: [
      {
        path: 'ui',
        component: UiComponent,
        children: [],
      },
      {
        path: 'prefs',
        component: PrefsComponent,
        children: [],
      },
    ],
  },
];
