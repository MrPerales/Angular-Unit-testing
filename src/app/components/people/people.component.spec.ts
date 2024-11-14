import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from '../../models/person.model';
import { By } from '@angular/platform-browser';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleComponent, PersonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a list app-person components', () => {
    // arrange
    component.people = [
      new Person('User1', 'lastName1', 30, 95, 1.9),
      new Person('User2', 'lastName2', 20, 50, 1.3),
      new Person('User3', 'lastName3', 10, 20, 1.4),
      new Person('User4', 'lastName4', 15, 15, 1.1),
    ];
    fixture.detectChanges(); //detectamos los cambios para que podamos
    // obtener correctamente el elemento Debug y no obtener el elemento sin los cambios
    // por eso seleccionamos a los elementos despues
    // act
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    // assert
    expect(debugElement.length).toEqual(4);
  });
  it('should render a person when is selected ', () => {
    // arrange
    component.people = [
      new Person('User1', 'lastName1', 30, 95, 1.9),
      new Person('User2', 'lastName2', 20, 50, 1.3),
      new Person('User3', 'lastName3', 10, 20, 1.4),
      new Person('User4', 'lastName4', 15, 15, 1.1),
    ];
    const btnDebug = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );
    // act
    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    //obtenemos el li despues de darle click ya que solo se renderiza
    // cuando contiene una person por el if en el html
    const liDebug = fixture.debugElement.queryAll(By.css('ul li'));
    // ya que del debug obtenemos  una lista de elementos los seleccionamos uno a uno
    // (por queryAll)
    const liName = liDebug[0].nativeElement;
    const liAge = liDebug[1].nativeElement;

    // assert
    expect(liName.textContent).toContain(component.people[0].name);
    expect(liAge.textContent).toContain(component.people[0].age);
  });
});
