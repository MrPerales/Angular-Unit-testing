import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import {
  fakeActivatedRouteSnapshot,
  fakeParamMap,
  fakeRouterStateSnapshot,
  mockObservable,
} from '../../testing';
import { Observable } from 'rxjs';
import { generateOneUser } from '../models/user.mock';

fdescribe('Test authGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let tokenService: jasmine.SpyObj<TokenService>;
  let router: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    const tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getToken']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    tokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });
  it('should be created', () => {
    // prueb por defecto al crear el guard con cli de angular
    const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

    expect(executeGuard).toBeTruthy();
  });
  it('should return true with session', (doneFn) => {
    const activatedRoute = fakeActivatedRouteSnapshot({
      paramMap: fakeParamMap({
        idProduct: '123',
      }),
    });
    const routerState = fakeRouterStateSnapshot({});
    const userMock = generateOneUser();
    authService.getUser.and.returnValue(mockObservable(userMock));
    const guardResponse = TestBed.runInInjectionContext(
      () => authGuard(activatedRoute, routerState) as Observable<boolean>
    );
    guardResponse.subscribe((rta) => {
      expect(rta).toBeTruthy();
      doneFn();
    });
  });
  it('should return false without session', (doneFn) => {
    const activatedRoute = fakeActivatedRouteSnapshot({
      paramMap: fakeParamMap({
        idProduct: '123',
      }),
    });
    const routerState = fakeRouterStateSnapshot({});
    authService.getUser.and.returnValue(mockObservable(null));
    const guardResponse = TestBed.runInInjectionContext(
      () => authGuard(activatedRoute, routerState) as Observable<boolean>
    );
    guardResponse.subscribe((rta) => {
      expect(rta).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
      doneFn();
    });
  });

  it('should return false with idProduct Params', (doneFn) => {
    const activatedRoute = fakeActivatedRouteSnapshot({
      //ya que utilizamos route.paramMap.get('idProduct'); o . has('idProduct')
      paramMap: fakeParamMap({
        idProduct: '123',
      }),
    });
    const routerState = fakeRouterStateSnapshot({});
    authService.getUser.and.returnValue(mockObservable(null));
    const guardResponse = TestBed.runInInjectionContext(
      () => authGuard(activatedRoute, routerState) as Observable<boolean>
    );
    guardResponse.subscribe((rta) => {
      expect(rta).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
      doneFn();
    });
  });
});
// fdescribe('authGuard', () => {
//   const executeGuard: CanActivateFn = (...guardParameters) =>
//     TestBed.runInInjectionContext(() => authGuard(...guardParameters));
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [authGuard],
//     });
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();

//   });
//   it('should return true', () => {
//   });

// });

///////////////////////////////////////////
