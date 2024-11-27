import { defer, of } from 'rxjs';

// Tipado dinamico
export function asyncData<T>(data: T) {
  // defer => emula la demora ya que el observable se crea hasta que te suscribes a el
  return defer(() => Promise.resolve(data));
}

export function asyncError(error: unknown) {
  return defer(() => Promise.reject(error));
}

export function mockObservable<T>(data: T) {
  return of(data);
}

export function mockPromise<T>(data: T) {
  return Promise.resolve(data);
}
