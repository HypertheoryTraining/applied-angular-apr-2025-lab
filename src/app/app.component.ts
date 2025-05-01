import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar';
import { RouterOutlet } from '@angular/router';
import { HitCounter } from '@app-shared/services/hit-counter';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar />
    <main class="container mx-auto">
      <!-- Put the content of the active route here -->
      <router-outlet />
    </main>
  `,
  styles: [],
  imports: [NavbarComponent, RouterOutlet],
})
export class AppComponent {
  constructor(public hc: HitCounter) {}
}
