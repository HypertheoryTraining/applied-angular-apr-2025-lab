import { HttpResponse, http, delay } from 'msw';
import books from './books';

export const Books_Handlers = [
  http.get('/api/books', async () => {
    await delay(1000);
    return HttpResponse.json(books);
  }),
];