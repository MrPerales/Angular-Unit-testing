import { Component } from '@angular/core';
import { PersonComponent } from '../person/person.component';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [PersonComponent],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent {
  constructor() {}
  // person: Person = new Person('Carlos', 'carlos', 30, 95, 1.9);

  people: Person[] = [
    new Person('User1', 'lastName', 30, 95, 1.9),
    new Person('User2', 'lastName', 20, 50, 1.4),
  ];
  selectedPerson: Person | null = null;

  choose(person: Person) {
    this.selectedPerson = person;
  }
}
