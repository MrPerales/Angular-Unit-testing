import { ComponentFixture } from '@angular/core/testing';
import { query, queryById } from './finders';

export function clickEvent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false,
  event: unknown = null
) {
  let debugElement;
  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }
  debugElement.triggerEventHandler('click', event); //solo ejecuta la accion del boton
  // mas no lo presiona por asi decirlo
}

//clickElement simula el presionar el boton
export function clickElement<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false
) {
  let debugElement;
  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }
  const element: HTMLElement = debugElement.nativeElement;
  element.click();
}
