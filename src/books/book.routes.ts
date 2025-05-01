import { Routes } from '@angular/router';
import { BooksComponent } from './books';
import { ListComponent } from './pages/list';
import { Library } from './services/book-service';
import { BookStore } from './services/book-store';
import { StatsComponent } from './pages/stats';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    providers: [Library, BookStore],
    children: [
      {
        path: 'stats',
        component: StatsComponent,
      },
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
