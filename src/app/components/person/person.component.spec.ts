import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/person.model';

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

  it('should the name be "Carlos"', () => {
    component.person = new Person('Carlos', 'carlos', 30, 95, 1.9);
    expect(component.person.name).toEqual('Carlos');
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

  // render dinamico

  it('should have <h4> with "Hola , soy {{person.name}}"', () => {
    // arrange
    component.person = new Person('<CARLOS>', 'carlos', 30, 95, 1.9);
    const expectMessage = `Hola, soy ${component.person.name}`;
    const personDebug: DebugElement = fixture.debugElement;
    const h4Debug: DebugElement = personDebug.query(By.css('h4'));
    const h4: HTMLElement = h4Debug.nativeElement;
    // act
    fixture.detectChanges(); //detectamos los cambios ya que se tiene que renderizar
    // assert
    expect(h4?.textContent).toEqual(expectMessage);
  });
  it('should have <span> with "mi altura es {{ person?.heigth }}"', () => {
    // arrange
    component.person = new Person('<CARLOS>', 'carlos', 30, 95, 1.9);
    const personDebug: DebugElement = fixture.debugElement;
    const spanDebug: DebugElement = personDebug.query(By.css('span'));
    const span: HTMLElement = spanDebug.nativeElement;
    // act
    fixture.detectChanges();
    // assert
    //  toContain=>para saber si en una parte del elemento tiene la altura
    expect(span?.textContent).toContain(component.person.heigth);
  });

  // botton
  it('should display a text with IMC when call calcIMC ', () => {
    component.person = new Person('Carlos', 'carlos', 30, 95, 1.9);
    const personDebug: DebugElement = fixture.debugElement;
    const buttonDebug: DebugElement = personDebug.query(
      By.css('button.btn-imc') //select boton with class
    );
    const button: HTMLElement = buttonDebug.nativeElement;

    component.calcIMC();
    fixture.detectChanges();

    expect(button?.textContent).toContain('overweigth');
  });

  // with click
  it('should display a text with IMC when do click', () => {
    component.person = new Person('Carlos', 'carlos', 30, 95, 1.9);
    const personDebug: DebugElement = fixture.debugElement;
    const buttonDebug: DebugElement = personDebug.query(
      By.css('button.btn-imc') //select boton with class
    );
    const button: HTMLElement = buttonDebug.nativeElement;
    // emulacion del click
    // ('tipo de evento', parametros )
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(button?.textContent).toContain('overweigth');
  });

  // tests outputs
  it('should raise selected event when do click', (dondeFn) => {
    const expectPerson = new Person('Carlos', 'carlos', 30, 95, 1.9);
    component.person = expectPerson;
    const personDebug: DebugElement = fixture.debugElement;
    const buttonDebug: DebugElement = personDebug.query(
      By.css('button.btn-choose')
    );

    // provamos si el output funciona correctamente
    // como es un observable podemos subscribie
    let selectedPerson: Person | undefined;
    component.onSelected.subscribe((data) => {
      selectedPerson = data;
      dondeFn();
    });
    // act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // la persona seleccionada sea igual a la que envie como input
    expect(selectedPerson).toEqual(expectPerson);
  });
});