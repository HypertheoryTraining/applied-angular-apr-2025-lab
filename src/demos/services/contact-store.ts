import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { addEntity, setEntities, withEntities } from '@ngrx/signals/entities';
import { ContactApiModel, ContactCreateModel } from '../types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, effect, inject } from '@angular/core';
import { ContactListService } from './contact-list.service';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, pipe, switchMap, tap } from 'rxjs';

export const ContactStore = signalStore(
  withDevtools('Contacts'),
  withState({
    loading: false,
  }),
  withEntities<ContactApiModel>(),
  withMethods((store) => {
    const service = inject(ContactListService);
    return {
      _load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            service
              .getContacts()
              .pipe(
                tap((contacts) =>
                  patchState(store, { loading: false }, setEntities(contacts)),
                ),
              ),
          ),
        ),
      ),
      addContact: rxMethod<ContactCreateModel>(
        pipe(
          mergeMap((m) =>
            service
              .addContact(m)
              .pipe(tap((contact) => patchState(store, addEntity(contact)))),
          ),
        ),
      ),
    };
  }),
  withComputed((store) => {
    return {
      numberOfContacts: computed(() => store.entities().length),
    };
  }),
  withHooks({
    onInit: (store) => {
      store._load();

      effect(() => {
        setInterval(() => store._load(), 5000);
      });
    },
  }),
);
