import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/products/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/product-detail/product-detail.component').then(
        (c) => c.ProductDetailComponent
      ),
  },
];

export default routes;
