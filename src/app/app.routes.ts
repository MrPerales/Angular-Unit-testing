import { Routes } from '@angular/router';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { PeopleComponent } from './components/people/people.component';
import { OthersComponent } from './components/others/others.component';
import { authGuard } from './guards/auth.guard';

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
    canActivate: [authGuard],
    component: OthersComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
];
