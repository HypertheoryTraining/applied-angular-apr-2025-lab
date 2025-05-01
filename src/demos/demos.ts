import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthStore } from '@app-shared/stores/auth-store';
import { ContactStore } from './services/contact-store';
import { ContactListService } from './services/contact-list.service';

@Component({
  providers: [ContactStore, ContactListService],
  selector: 'app-demos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex flex-row gap-4">
      <a class="link" routerLink="signals">Signals</a>
      @if (store.isLoggedIn()) {
        <a class="link" routerLink="shared-state">Shared State</a>
      }
      <a class="link" routerLink="info">Info</a>
    </div>

    <div>
      <p>You have {{ constacStore.numberOfContacts() }} contacts.</p>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class DemosComponent {
  store = inject(AuthStore);

  constacStore = inject(ContactStore);
}
