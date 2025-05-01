import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AuthStore } from '@app-shared/stores/auth-store';

@Component({
  selector: 'app-navbar-end',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `@if (store.isLoggedIn()) {
      <button class="btn btn-success" (click)="store.logout()">
        {{ store.userName() }}
      </button>
    } @else {
      <button class="btn btn-primary" (click)="store.login()">Login</button>
    } `,
  styles: ``,
})
export class NavbarEndComponent {
  store = inject(AuthStore);
}
