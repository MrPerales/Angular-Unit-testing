import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, Router, RouterLinkWithHref } from '@angular/router';
import {
  asyncData,
  clickElement,
  getText,
  mockObservable,
  query,
  queryAllByDirective,
} from '../testing';

import { routes } from './app.routes';
import { ProductsService } from './services/product.service';
import { generateManyProducts } from './models/product.mock';
import { AuthService } from './services/auth.service';
import { generateOneUser } from './models/user.mock';

// nota: para las routes que son lazy load no se pueden testear ,
//  se tienen que testear en su propio modulo

fdescribe('AppComponent Integration Test', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let productService: jasmine.SpyObj<ProductsService>;
  let authService: jasmine.SpyObj<AuthService>;
  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getAll',
    ]);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(routes),
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA], //para ignorar los warnings de los componentes no declarados
    }).compileComponents();
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(fakeAsync(() => {
    router = TestBed.inject(Router);
    router.initialNavigation();
    tick(); // espera hasta que acabe la navegacion
    fixture.detectChanges(); //ngOnInit
  }));
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should there are 6 routerLinks', () => {
    const links = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(links.length).toEqual(6);
  });

  it('should render OthersComponent when clicked and render product length with session ', fakeAsync(() => {
    // mock del servicio de productos el cual usamos en el componente others
    const productMock = generateManyProducts(10);
    productService.getAll.and.returnValue(asyncData(productMock));

    const user = generateOneUser();
    authService.getUser.and.returnValue(mockObservable(user));

    clickElement(fixture, 'others-link', true); //navegamos a la ruta others
    tick(); //esperamos la navegacion y cargue el componente others
    fixture.detectChanges(); //ngOnInit -OthersComponents

    tick(); //resuelve "getAll" y actualizamos el componente
    fixture.detectChanges();

    expect(router.url).toEqual('/others');
    // comporbamos si el componente es el esperado en la ruta others
    const componentElement = query(fixture, 'app-others');
    expect(componentElement).not.toBeNull();

    // comprobamos si el texto de la longitud de productos es correcto
    const text = getText(fixture, 'products-length');
    expect(text).toContain(productMock.length);
  }));
  it('should render OthersComponent when clicked without session ', fakeAsync(() => {
    // no hace falta mockear el servicio de productos ya que nos tiene que redirigir a home
    authService.getUser.and.returnValue(mockObservable(null));

    clickElement(fixture, 'others-link', true); //navegamos a la ruta others
    tick(); //esperamos la navegacion y cargue el componente others
    fixture.detectChanges(); //ngOnInit -OthersComponents

    tick(); //resuelve "getAll" y actualizamos el componente
    fixture.detectChanges();

    expect(router.url).toEqual('/');
  }));
  it('should render PicoPreviewComponent when clicked', fakeAsync(() => {
    clickElement(fixture, 'pico-preview-link', true);
    tick();
    fixture.detectChanges(); //ngOnInit -PicoPreviewComponent
    expect(router.url).toEqual('/pico-preview');

    const componentElement = query(fixture, 'app-pico-preview');
    expect(componentElement).not.toBeNull();
  }));
});
