import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  //fixture => ambiente para poder interactuar con el componente
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonComponent],
    }).compileComponents(); //compila los componentes importados

    // ya que acabe de compilar los componentes
    // creamos el comonente
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance; // asignamos todos sus metodos de ese componente
    fixture.detectChanges(); // ciclo de vida de angular
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // render tests
  it('should have <p> with "soy un parrafo"', () => {
    //obtenemso el elemento que se esta renderizando
    // lo tipamos para que nos de las opciones vs code
    const personElement: HTMLElement = fixture.nativeElement;
    const p = personElement.querySelector('p'); //seleccionamos el elemnto p
    // probamos si la etiqueta p tiene ese texto
    expect(p?.textContent).toEqual('soy un parrafo');
  });
  //buena practica testarlo con debug por si tu app no es directamente en un navegador
  // ya que angular puede ser agnostico
  it('should have <h3> with "person works!"', () => {
    // elemento debug del componente
    const personDebug: DebugElement = fixture.debugElement;
    // sleccionamos la etiqueta de forma agnostica
    const h3Debug: DebugElement = personDebug.query(By.css('h3')); //OJO esto no te regresa el elemto html
    // ya teniendo el elemento nativo se puede testear
    const h3: HTMLElement = h3Debug.nativeElement;
    // probamos si la etiqueta p tiene ese texto
    expect(h3?.textContent).toEqual('person works!');
  });
});
