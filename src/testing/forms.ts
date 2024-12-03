import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { query, queryById } from './finders';

export function setInputValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: string,
  withTestId: boolean = false
) {
  let debugElement: DebugElement;
  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }
  const inputElement: HTMLInputElement = debugElement.nativeElement;
  inputElement.value = value;
  inputElement.dispatchEvent(new Event('input'));
  inputElement.dispatchEvent(new Event('blur'));
}

export function setInputCheckbox<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: boolean,
  withTestId: boolean = false
) {
  let debugElement: DebugElement;
  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }
  const inputElement: HTMLInputElement = debugElement.nativeElement;
  inputElement.checked = value;
  inputElement.dispatchEvent(new Event('input'));
  inputElement.dispatchEvent(new Event('blur'));
}
