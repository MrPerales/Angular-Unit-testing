import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingHarness } from '@angular/router/testing';

export function getText<T>(fixture: ComponentFixture<T>, testId: string) {
  const debugElement = queryById(fixture, testId);
  const element: HTMLElement = debugElement.nativeElement;
  return element.textContent;
}
export function getTextHarness(harness: RouterTestingHarness, testId: string) {
  const debugElement = queryById(harness.fixture, testId);
  const element: HTMLElement = debugElement.nativeElement;
  return element.textContent;
}

export function query<T>(fixture: ComponentFixture<T>, selector: string) {
  const debugElement = fixture.debugElement.query(By.css(selector));
  if (!debugElement) {
    throw new Error(`query: element with ${selector} not found`);
  }
  return debugElement;
}

export function queryById<T>(fixture: ComponentFixture<T>, testId: string) {
  const selector = `[data-testid="${testId}"]`;
  return query(fixture, selector);
}

export function queryAll<T>(fixture: ComponentFixture<T>, selector: string) {
  return fixture.debugElement.queryAll(By.css(selector));
}

export function queryAllByDirective<T, D>(
  fixture: ComponentFixture<T>,
  directive: Type<D> //tipado directiva dinamica
) {
  return fixture.debugElement.queryAll(By.directive(directive));
}
