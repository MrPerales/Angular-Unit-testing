import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login-form/login-form.component').then(
        (c) => c.LoginFormComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register-form/register-form.component').then(
        (c) => c.RegisterFormComponent
      ),
  },
];
export default routes;
