import { delay, http, HttpResponse } from 'msw';
import { ContactApiModel, ContactCreateModel } from '../demos/types';

const fakeContacts: ContactApiModel[] = [
  {
    id: '1',
    name: 'Jenny',
    email: 'jenny@aol.com',
    phone: '867-5309',
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'John',
    email: 'john@aol.com',
    phone: '123-4567',
    createdAt: '2023-01-02T00:00:00.000Z',
  },
];
export const ContactsHandler = [
  http.get('/api/contacts', async () => {
    await delay();
    return HttpResponse.json(fakeContacts);
  }),
  http.post('/api/contacts', async ({ request }) => {
    await delay();
    const requestBody = (await request.json()) as unknown as ContactCreateModel;
    const contact = {
      ...requestBody,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    fakeContacts.push(contact);
    return HttpResponse.json(contact);
  }),
];
