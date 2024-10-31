import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'testing-services';

  ngOnInit() {
    const calculator = new Calculator();
    const rta = calculator.multiply(1, 4);
    const rta2 = calculator.devide(1, 4);
  }
}
