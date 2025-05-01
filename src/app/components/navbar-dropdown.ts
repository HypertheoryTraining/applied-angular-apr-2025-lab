import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { LinkModel } from '../types';

@Component({
  selector: 'app-navbar-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        @for (link of links(); track link.path) {
          <li>
            <a>{{ link.text }}</a>
          </li>
        }
      </ul>
    </div>
  `,
  styles: ``,
})
export class NavbarDropdownComponent {
  links = input.required<LinkModel[]>();
}
