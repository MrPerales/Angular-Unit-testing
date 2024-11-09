import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
})
export class PersonComponent {
  @Input() person!: Person;
  @Output() onSelected = new EventEmitter<Person>();
  imc = '';
  constructor() {}

  calcIMC() {
    this.imc = this.person.calcIMC();
  }

  onClick() {
    this.onSelected.emit(this.person);
  }
}
