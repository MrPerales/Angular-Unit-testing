import { Component } from '@angular/core';
import { ProductsService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CardProductComponent } from './../card-product/card-product.component';
import { ValueService } from '../../../services/value.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'init' | 'error' = 'init';
  rta: string = '';
  constructor(
    private productService: ProductsService,
    private valueService: ValueService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.status = 'loading';
    this.productService.getAll(this.limit, this.offset).subscribe({
      next: (products) => {
        this.products = [...this.products, ...products];
        this.offset += this.limit; //paginacion
        this.status = 'success';
      },
      error: (error) => {
        // setTimeout solo para fines practicos en el test
        setTimeout(() => {
          this.products = [];
          this.status = 'error';
        }, 3000);
      },
    });
  }

  async callPromise() {
    const rta = await this.valueService.getPromiseValue();
    this.rta = rta;
  }
}
