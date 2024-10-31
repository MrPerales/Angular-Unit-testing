import { Component } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
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
      .getAllSimple()
      .subscribe((products) => (this.products = products));
  }
}
