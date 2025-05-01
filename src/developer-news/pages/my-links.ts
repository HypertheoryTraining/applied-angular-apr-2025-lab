import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-links-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>My Links History</p>

    <p>My Links</p>

    <p>Hidden Links</p>
  `,
  styles: ``,
})
export class MyLinksComponent {}
