import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BookStore } from '../services/book-store';
import { SmartDatePipe } from '../pipes/smart-date-pipe';
import { SmartNumber } from '../pipes/smart-number-pipe';

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SmartDatePipe, SmartNumber],
  template: `
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-figure text-secondary">
          <!--ideally these would be in a stat class, and i woudl generate them based on stats objects -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
            <path
              fill="currentColor"
              d="M7.616 21q-1.085 0-1.85-.766Q5 19.47 5 18.385V6q0-1.258.871-2.129T8 3h11v13.77q-.663 0-1.14.475t-.475 1.14t.476 1.139T19 20v1zm.769-5.23h1V4h-1zM7.615 20h9.364q-.285-.33-.44-.732q-.155-.4-.155-.884q0-.457.152-.87t.443-.745H7.616q-.689 0-1.152.476T6 18.385q0 .688.464 1.151T7.616 20"
            />
          </svg>
        </div>
        <div class="stat-title">Total Books</div>
        <div class="stat-value">{{ bookstore.totalBooks() | smartNum }}</div>
        <div class="stat-desc">Whoa!</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
            <path
              fill="currentColor"
              d="m12.5 12.387l2.788 2.788q.14.136.14.339t-.14.35q-.146.165-.356.155t-.357-.155l-2.833-2.833q-.13-.131-.186-.274t-.056-.297V8.423q0-.213.144-.356t.357-.144t.356.144t.143.356zM12 6q-.213 0-.357-.144T11.5 5.5V4h1v1.5q0 .213-.144.356T11.999 6M18 12q0-.213.144-.357t.356-.143H20v1h-1.5q-.213 0-.356-.144T18 11.999M12 18q.214 0 .357.144t.143.356V20h-1v-1.5q0-.213.144-.356t.357-.144M6 12q0 .214-.144.357T5.5 12.5H4v-1h1.5q.213 0 .356.144t.144.357M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M20 12q0-3.35-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20t5.675-2.325T20 12m-8 0"
            />
          </svg>
        </div>
        <div class="stat-title">Oldest Book Year</div>
        <div class="stat-value">
          {{ bookstore.oldestBookDate() | smartDate }}
        </div>
        <div class="stat-desc">Thats old!</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
            <path
              fill="currentColor"
              d="M12 20.5q-.213 0-.357-.144T11.5 20v-7.398q-1.408 0-2.69-.526T6.536 10.56T5.034 8.285t-.514-2.69v-.23q0-.336.227-.563t.562-.226h.23q1.368 0 2.649.535q1.28.536 2.27 1.526q.795.795 1.288 1.806t.653 2.139q.221-.425.496-.8q.275-.373.623-.721q.984-.987 2.274-1.525T18.481 7h.23q.336 0 .562.227q.227.226.227.561v.231q0 1.4-.537 2.69q-.538 1.29-1.525 2.274q-.99.99-2.26 1.503Q13.908 15 12.5 15v5q0 .213-.144.356t-.357.144m-.48-8.923q0-1.2-.462-2.287T9.744 7.352T7.807 6.04t-2.288-.463q0 1.2.45 2.3t1.3 1.95t1.95 1.3t2.3.45M12.5 14q1.2 0 2.288-.45t1.937-1.3t1.313-1.95T18.5 8q-1.2 0-2.3.463t-1.95 1.312t-1.3 1.938T12.5 14m-.98-2.423"
            />
          </svg>
        </div>
        <div class="stat-title">Newest Book Year</div>
        <div class="stat-value">
          {{ bookstore.newestBookDate() | smartDate }}
          <div>
            <div class="stat-desc">Hmm that soon??</div>
          </div>
        </div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
            <path
              fill="currentColor"
              d="M10.5 13.5h2.48q.214 0 .358-.143T13.48 13t-.143-.357t-.357-.143H10.5q-.213 0-.357.143T10 13t.143.357t.357.143m0-3h5.962q.213 0 .356-.143t.144-.357t-.144-.357t-.356-.143H10.5q-.213 0-.357.143T10 10t.143.357t.357.143m0-3h5.962q.213 0 .356-.143T16.962 7t-.144-.357t-.356-.143H10.5q-.213 0-.357.143T10 7t.143.357t.357.143M8.116 17q-.691 0-1.153-.462T6.5 15.385V4.615q0-.69.463-1.153T8.116 3h10.769q.69 0 1.153.462t.462 1.153v10.77q0 .69-.462 1.152T18.884 17zm0-1h10.769q.23 0 .423-.192t.192-.423V4.615q0-.23-.192-.423T18.884 4H8.116q-.231 0-.424.192t-.192.423v10.77q0 .23.192.423t.423.192m-3 4q-.69 0-1.153-.462T3.5 18.385V7.115q0-.213.143-.356T4 6.616t.357.143t.143.357v11.269q0 .23.192.423t.423.192h11.27q.213 0 .356.143t.144.357t-.144.357t-.356.143zM7.5 4v12z"
            />
          </svg>
        </div>
        <div class="stat-title">Average Page Count</div>
        <div class="stat-value">
          {{ bookstore.avgPages().toFixed(2) }}
          <div>
            <div class="stat-desc">That's a lot of flippin!</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class StatsComponent {
  bookstore = inject(BookStore);
}
