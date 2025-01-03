import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighligthDirective } from '../../directives/highligth.directive';
import { ReversePipe } from '../../pipes/reverse.pipe';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/product.service';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [FormsModule, HighligthDirective, ReversePipe],
  templateUrl: './others.component.html',
  styleUrl: './others.component.scss',
})
export class OthersComponent {
  color = 'orange';
  text = 'roma';
  products: Product[] = [];
  constructor(private productService: ProductsService) {}
  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
    });
  }
}
