import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-dev-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <button
      onclick="devmodal.showModal()"
      class="btn absolute bottom-0 right-0 ring-4 opacity-25 hover:opacity-100 bg-green-600 text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
        <path
          fill="currentColor"
          d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm0-2h16V8H4zm3.5-1l-1.4-1.4L8.675 13l-2.6-2.6L7.5 9l4 4zm4.5 0v-2h6v2z"
        />
      </svg>
    </button>

    <dialog id="devmodal" class="modal">
      <div class="modal-box">
        <h2 class="text-2xl font-bold">{{ title() }}</h2>
        <pre class="">
        <ng-content></ng-content>
</pre>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  `,
  styles: ``,
})
export class DevBlockComponent {
  title = input('Dev Modal');
}
