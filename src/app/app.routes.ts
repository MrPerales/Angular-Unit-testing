import { Routes } from '@angular/router';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { PeopleComponent } from './components/people/people.component';
import { OthersComponent } from './components/others/others.component';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./products/products.routes'),
  },
  {
    path: 'pico-preview',
    component: PicoPreviewComponent,
  },
  {
    path: 'people',
    component: PeopleComponent,
  },
  {
    path: 'others',
    component: OthersComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
];
