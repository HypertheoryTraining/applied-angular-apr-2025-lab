import { Routes } from '@angular/router';
import { BooksComponent } from './books';
import { ListComponent } from './pages/list';
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
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
