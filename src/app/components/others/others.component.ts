import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighligthDirective } from '../../directives/highligth.directive';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [FormsModule, HighligthDirective],
  templateUrl: './others.component.html',
  styleUrl: './others.component.scss',
})
export class OthersComponent {
  color = 'orange';
}
