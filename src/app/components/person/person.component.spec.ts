import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';

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
  //
});
