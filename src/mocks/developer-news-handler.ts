import { delay, http, HttpResponse } from 'msw';
import { NewsLinkModel } from '../developer-news/types';

const FAKE_DATA: NewsLinkModel[] = [
  {
    id: '1',
    title: 'Applied Angular Course Materials',
    description: 'Stuff from class',
    href: 'https://applied-angular.hypertheory.com',
  },
  {
    id: '99',
    title: 'TypeScript Official Documentation',
    href: 'https://typescriptlang.org',
  },
];
export const NewsHandler = [
  http.get(
    'https://some-api.company-that-does-not-exist.com/news-links',
    async () => {
      await delay(); // 100 - 200 ms (reasonable expectation)
      return HttpResponse.json(FAKE_DATA);
    },
  ),
];
