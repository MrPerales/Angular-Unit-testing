import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CurrencyPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CurrencyPipe, SlicePipe],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
})
export class CardProductComponent {
  @Input() product!: Product;
  constructor() {}
}
