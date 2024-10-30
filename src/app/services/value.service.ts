import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValueService {
  constructor() {}

  private value = 'my value';

  getValue() {
    return this.value;
  }

  setValue(newValue: string) {
    this.value = newValue;
  }

  getPromiseValue() {
    return Promise.resolve('promise value');
  }

  getObservable() {
    // of => observable con valor definido
    return of('observable value');
  }
}
