import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-welcome',
  imports: [],
  template: `
    <div class="prose pt-12">
      <h1>Angular Starter</h1>
      <p>Proudly Using Angular {{ v.full }}</p>
      <h2>Additional Installations</h2>
      <div class="flex gap-4">
        <a class="btn btn-wide btn-primary" href="https://tailwindcss.com/"
          >Tailwind for CSS</a
        >

        <a class="btn  btn-primary" href="https://daisyui.com/"
          >DaisyUi for UI Library</a
        >

        <a class="btn  btn-primary" href="https://mswjs.io/"
          >Mock Service Workers</a
        >

        <a class="btn  btn-primary" href="https://prettier.io/">Prettier</a>

        <a class="btn  btn-primary" href="https://eslint.org/">ESLint</a>
      </div>
    </div>
  `,
  styles: ``,
})
export class WelcomeComponent {
  v = VERSION;
}
