import { signal } from '@angular/core';

export class HitCounter {
  #count = signal(0);

  recordCount() {
    this.#count.update((c) => c + 1);
  }

  getCount() {
    return this.#count();
  }
}
