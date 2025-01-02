import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService: TokenService = inject(TokenService);
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  // const token= tokenService.getToken()
  // if(!token){
  //   router.navigate(['/home'])
  //   return false
  // }
  // return true;

  // route.params['idProduct']; //
  // route.data['idProduct']
  // route.queryParams['idProduct']
  route.paramMap.get('idProduct');
  route.paramMap.has('idProduct');
  return authService.getUser().pipe(
    map((user) => {
      if (!user) {
        router.navigate(['/home']);
        return false;
      }
      return true;
    })
  );
};
