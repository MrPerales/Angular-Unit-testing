import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const tokenService: TokenService = inject(TokenService);
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  // const token= tokenService.getToken()
  // if(!token){
  //   router.navigate(['/home'])
  //   return false
  // }
  // return true;
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
