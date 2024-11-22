// nota para hacer tests es mejor usar un HostComponent
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HighligthDirective } from './highligth.directive';

@Component({
  standalone: true,
  imports: [HighligthDirective],
  template: `
    <h5 class="title" highligth>background Default</h5>
    <h5 highligth="pink">background con input</h5>
    <p highligth="blue">parrafo</p>
    <p>otro parrafo</p>
  `,
})
class HostComponent {}

// TESTS
fdescribe('Tests for HighligthDirective', () => {
  let component: HostComponent;
  //fixture => ambiente para poder interactuar con el componente
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents(); //compila los componentes importados

    // ya que acabe de compilar los componentes
    // creamos el comonente
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance; // asignamos todos sus metodos de ese componente
    fixture.detectChanges(); // ciclo de vida de angular
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 highligth elements', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(HighligthDirective)
    );
    expect(elements.length).toEqual(3);
  });
  it('shoudl have one element without directive', () => {
    const element = fixture.debugElement.queryAll(By.css('*:not([highligth])'));
    expect(element.length).toEqual(1);
  });
  it('should the elements be match with bgColor', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(HighligthDirective)
    );
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('pink');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('blue');
  });
  it('should the h5.title be defaultColor', () => {
    const titleDebug = fixture.debugElement.query(By.css('.title'));
    // agregamos la directiva para obtener el defaultColor para compararlos en el test
    const directiva = titleDebug.injector.get(HighligthDirective);
    expect(titleDebug.nativeElement.style.backgroundColor).toEqual(
      directiva.defaultColor
    );
  });
});
