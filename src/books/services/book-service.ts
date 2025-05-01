import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BookApiEntity } from '../pages/list';
import { Observable } from 'rxjs';

// This is a service that will be used to get the books from the API
// It will be used in the BookStore to get the books and update the store as well as other operations as needed.

export class Library {
  client = inject(HttpClient);

  getBooks(): Observable<BookApiEntity[]> {
    return this.client.get<BookApiEntity[]>('/api/books');
  }
}
