import { Routes } from '@angular/router';
import { DeveloperNewsComponent } from './developer-news';
import { ListComponent } from './pages/list';
import { MyLinksComponent } from './pages/my-links';
export const DEVELOPER_NEWS_ROUTES: Routes = [
  {
    path: '',
    component: DeveloperNewsComponent,
    providers: [],
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'my-links',
        component: MyLinksComponent,
      },
    ],
  },
];
