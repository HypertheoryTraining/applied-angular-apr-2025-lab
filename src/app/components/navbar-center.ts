import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { LinkModel } from '../types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-center',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <ul class="menu menu-horizontal px-1">
      @for (link of links(); track link.path) {
        <li>
          <a [routerLink]="[link.path]">{{ link.text }}</a>
        </li>
      }
    </ul>
  `,
  styles: ``,
})
export class NavbarCenterComponent {
  links = input.required<LinkModel[]>();
}
