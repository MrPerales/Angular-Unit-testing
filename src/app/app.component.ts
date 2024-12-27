import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Calculator } from './calculator';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, BannerComponent, FooterComponent],
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
