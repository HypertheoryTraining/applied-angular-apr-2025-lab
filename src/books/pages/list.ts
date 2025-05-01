import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BookListStore } from '../stores/book-store';
import { BookDetailsComponent } from '../components/book-details';
export type BookApiEntity = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: string;
};

@Component({
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookDetailsComponent],
  template: `
    <p>Want To Read</p>
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <!-- head -->
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>author</th>
          </tr>
        </thead>
        <tbody>
          @for (book of store.sortedBooks(); track book.id) {
            <tr>
              <th>{{ book.id }}</th>
              <td>
                <button class="btn" onclick="openModel(book)">
                  {{ book.title }}
                </button>
              </td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
    <dialog id="my_modal" class="modal">
      <div class="modal-box">
        @if (selectedBook) {
          <app-book-details [book]="selectedBook" />
        }
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  `,

  styles: ``,
})
export class ListComponent {
  store = inject(BookListStore);
  selectedBook: BookApiEntity = this.store.entities()[0];
  openModal(book: BookApiEntity) {
    this.selectedBook = book;
    const elem: HTMLDialogElement = document.getElementById(
      'my_modal',
    ) as HTMLDialogElement;
    elem.showModal();
  }
}
