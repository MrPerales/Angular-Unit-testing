// nota para hacer tests de directivas es mejor usar un HostComponent
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HighligthDirective } from './highligth.directive';
import { FormsModule } from '@angular/forms';
import { query, queryAll, queryAllByDirective, queryById } from '../../testing';

@Component({
  standalone: true,
  imports: [HighligthDirective, FormsModule],
  template: `
    <h5 data-testid="title" highligth>background Default</h5>
    <h5 highligth="pink">background con input</h5>
    <p highligth="blue">parrafo</p>
    <p>otro parrafo</p>
    <input [(ngModel)]="color" [highligth]="color" />
  `,
})
class HostComponent {
  color = 'blue';
}

// TESTS
describe('Tests for HighligthDirective', () => {
  let component: HostComponent;
  //fixture => ambiente para poder interactuar con el componente
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent, FormsModule],
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
    const elements = queryAllByDirective(fixture, HighligthDirective);
    expect(elements.length).toEqual(4); //4 ya que el input lo toma y no a la vez
  });

  it('shoudl have one element without directive', () => {
    // const element = fixture.debugElement.queryAll(By.css('*:not([highligth])'));
    const element = queryAll(fixture, '*:not([highligth])');
    expect(element.length).toEqual(2); //2 ya que el input lo toma y no a la vez
  });

  it('should the elements be match with bgColor', () => {
    // const elements = fixture.debugElement.queryAll(
    //   By.directive(HighligthDirective)
    // );
    const elements = queryAllByDirective(fixture, HighligthDirective);
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('pink');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('blue');
  });

  it('should the h5.title be defaultColor', () => {
    // const titleDebug = fixture.debugElement.query(By.css('.title'));
    const titleDebug = queryById(fixture, 'title');
    // agregamos la directiva para obtener el defaultColor para compararlos en el test
    const directiva = titleDebug.injector.get(HighligthDirective);
    expect(titleDebug.nativeElement.style.backgroundColor).toEqual(
      directiva.defaultColor
    );
  });

  // test input
  it('should bind <input> and change the bgColor', () => {
    // const inputDebug = fixture.debugElement.query(By.css('input'));
    const inputDebug = query(fixture, 'input');

    const inputElement: HTMLInputElement = inputDebug.nativeElement;

    expect(inputElement.style.backgroundColor).toEqual('blue');

    inputElement.value = 'orange'; //lo que escribe el usuario
    inputElement.dispatchEvent(new Event('input')); //para simular que el usiario esta escribiendo
    fixture.detectChanges();

    expect(inputElement.style.backgroundColor).toEqual('orange');
    expect(component.color).toEqual('orange'); // como le cambiamos el valor y gracias al ngModel cambiamos la propiedad color
  });
});
