import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ContactApiModel, ContactCreateModel } from '../types';

export class ContactListService {
  client = inject(HttpClient);
  // DO a post to an API when we add a contact

  addContact(contact: ContactCreateModel) {
    return this.client.post<ContactApiModel>('/api/contacts', contact);
    // todo
  }
  // GET our contact list from the api.
  getContacts() {
    return this.client.get<ContactApiModel[]>('/api/contacts');
  }
}
