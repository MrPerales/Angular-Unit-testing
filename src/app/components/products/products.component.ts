import { Component } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CardProductComponent } from '../card-product/card-product.component';

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
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.status = 'loading';
    this.productService
      .getAll(this.limit, this.offset)
      .subscribe((products) => {
        this.products = [...this.products, ...products];
        this.offset += this.limit; //paginacion
        this.status = 'success';
      });
  }
}
