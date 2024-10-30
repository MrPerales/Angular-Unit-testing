export class FakeValueService {
  constructor() {}

  getValue() {
    return 'fake value';
  }

  setValue(newValue: string) {}

  getPromiseValue() {
    return Promise.resolve('fake promise value');
  }
}
