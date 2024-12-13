import { CurrencyPipe, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) {}
  product: Product | null = null;
  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (param) => {
        const productId = param.get('id');
        if (productId) {
          this.getProductDetail(productId);
        } else {
          this.goToBack();
        }
      },
    });
  }

  private getProductDetail(productId: string) {
    this.productsService.getOne(productId).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => {
        console.log(error);
        this.goToBack();
      },
    });
  }
  goToBack() {
    this.location.back();
  }
}
