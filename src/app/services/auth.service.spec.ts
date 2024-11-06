import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';
import { Auth } from '../models/auht.model';

describe('Tests Auth Service', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, TokenService],
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    // varificamos si esta montado el mockData correctamente
    httpController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('test for loging', () => {
    it('should return a token ', (doneFn) => {
      const mockToken: Auth = {
        access_token: 'tokenFail',
      };
      const mail = 'fakeMail@mail.com';
      const password = 'passwordFake';
      authService.login(mail, password).subscribe({
        next: (token) => {
          expect(token).toEqual(mockToken);
          doneFn();
        },
      });
      // http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockToken);
    });

    it('should call to saveToken ', () => {
      const mockToken: Auth = { access_token: 'token' };
      const mail = 'fakeMail@mail.com';
      const password = 'passwordFake';
      // Para los métodos que no retornan nada, cuando se quiere espiar una función,
      //  pero que no ejecute el método , se le pone en el spyOn el and.callThrough():
      spyOn(tokenService, 'saveToken').and.callThrough();
      authService.login(mail, password).subscribe({
        next: (token) => {
          expect(token).toEqual(mockToken);
          expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
          // si fue llamado con ese argumento
          expect(tokenService.saveToken).toHaveBeenCalledWith('token');
        },
      });
      // http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockToken);
    });
  });
});
