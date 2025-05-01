import { Routes } from '@angular/router';
import { BooksComponent } from './books';
import { ListComponent } from './pages/list';
import { StatsComponent } from './pages/stats';
import { PrefsComponent } from './pages/prefs';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      },
      {
        path: 'prefs',
        component: PrefsComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
