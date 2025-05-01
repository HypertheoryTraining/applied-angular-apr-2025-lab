import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard';
import { HomeComponent } from './pages/home';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'developer-news',
    loadChildren: () =>
      import('../developer-news/developer-news.routes').then(
        (r) => r.DEVELOPER_NEWS_ROUTES,
      ),
  },
  {
    path: 'demos',
    loadChildren: () =>
      import('../demos/demos.routes').then((r) => r.DEMO_ROUTES),
  },
  {
    path: 'counter',
    loadChildren: () =>
      import('../counter-lab/counter.routes').then((r) => r.COUNTER_ROUTES),
  },
  {
    path: 'counter2',
    loadChildren: () =>
      import('../counter-lab2/counter.routes').then((r) => r.COUNTER_ROUTES_2),
  },
  {
    path: 'books',
    loadChildren: () =>
      import('../books/book.routes').then((r) => r.BOOKS_ROUTES),
  },
];
