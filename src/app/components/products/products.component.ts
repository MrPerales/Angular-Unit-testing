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
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    return this.productService
      .getAll()
      .subscribe((products) => (this.products = products));
  }
}
