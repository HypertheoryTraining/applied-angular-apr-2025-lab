import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ContactStore } from '../services/contact-store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-demos-contact-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe],
  template: `
    @if (store.loading()) {
      <span class="loading loading-infinity loading-lg"></span>
    }
    @for (contact of store.entities(); track contact.id) {
      <div class="card bg-base-200 shadow-xl mb-2">
        <div class="card-body">
          <h2 class="card-title">{{ contact.name }}</h2>
          <p>{{ contact.email }}</p>
          <p>{{ contact.phone }}</p>
          <p>{{ contact.createdAt | date: 'short' }}</p>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class ContactListComponent {
  store = inject(ContactStore);
}
