import { Routes } from '@angular/router';
import { BooksComponent } from './books';
import { ListComponent } from './pages/list';
import { StatsComponent } from './pages/stats';
import { DetailsComponent } from './pages/details';

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
        path: 'details/:id',
        component: DetailsComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
