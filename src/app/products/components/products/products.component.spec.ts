import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { CardProductComponent } from '../card-product/card-product.component';
import { ProductsService } from '../../../services/product.service';
import { generateManyProducts } from '../../../models/product.mock';
import { DebugElement } from '@angular/core';
import { ValueService } from '../../../services/value.service';
import {
  asyncData,
  asyncError,
  mockObservable,
  mockPromise,
  query,
  queryById,
} from './../../../../testing';

describe('ProductsComponent', () => {
  let productComponent: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>; //TiPADO de spy
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getAll',
    ]); //spy
    const valueServiceSpy = jasmine.createSpyObj('ValueService', [
      'getPromiseValue',
    ]);
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, CardProductComponent],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: ValueService, useValue: valueServiceSpy },
      ], //
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    productComponent = fixture.componentInstance;
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>; //productService como
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;

    const producstMock = generateManyProducts(5);
    // simulamos el ejecutar el servicio ,como nos tiene que retornar un observable usamos "of"
    // y nos retorna el productMock
    productService.getAll.and.returnValue(mockObservable(producstMock)); //refactorizado
    fixture.detectChanges(); //ngOnInit
  });

  it('should create', () => {
    expect(productComponent).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('test for getAllProducts', () => {
    it('should return product list from service', fakeAsync(() => {
      // arrange
      const producstMock = generateManyProducts(10);
      productService.getAll.and.returnValue(mockObservable(producstMock)); //refectorizado
      //se agrega un contador ya que en el beforeEach ya tenemos una cierta cantidad de productos
      // y para que no falle solo los agregamos en el expect
      const countPrev = productComponent.products.length;
      // const productDebug: DebugElement = fixture.debugElement.query(
      //   By.css('app-card-product figure figcaption')
      // );
      const productDebug: DebugElement = query(
        fixture,
        'app-card-product figure figcaption'
      );
      const figcaption: HTMLElement = productDebug.nativeElement;
      // const btnDebug = fixture.debugElement.query(By.css('.btn-getProducts'));
      const btnDebug = queryById(fixture, 'btn-getProducts');
      // act
      btnDebug.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      // assert
      expect(productComponent.products.length).toEqual(
        producstMock.length + countPrev
      );
      // render
      expect(figcaption).toBeTruthy();
    }));

    it('should change the status "loading" => "success"', fakeAsync(() => {
      // arrenge
      const producstMock = generateManyProducts(10);
      productService.getAll.and.returnValue(
        //emulamos una promesa para no usar un of el cual haria que se suscriba y porque vamos a usar el tick
        asyncData(producstMock)
      );
      const btnDebug = queryById(fixture, 'btn-getProducts');
      // act
      btnDebug.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(productComponent.status).toEqual('loading');
      // tick =>se utiliza con fakeAsync y es para ejecutar todo lo que este pendiente
      // por resolvese por ejemplo
      tick(); //observable , setTimeout, promise
      fixture.detectChanges(); //deteccion de cambios para que cambie el status
      // assert
      expect(productComponent.status).toEqual('success');
    }));

    it('should change the status "loading" => "error"', fakeAsync(() => {
      // arrange
      productService.getAll.and.returnValue(asyncError('error')); //promesa reject
      const btnDebug = queryById(fixture, 'btn-getProducts');
      // act
      btnDebug.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(productComponent.status).toEqual('loading');
      // assert
      tick(4000); //4000 por el setTimeout ,cuanta es la espera
      fixture.detectChanges();
      expect(productComponent.status).toEqual('error');
    }));
  });
  describe('Tests for callPromise', () => {
    it('should call to promise', async () => {
      // arrange
      const mockMessage = 'my mock Message';
      valueService.getPromiseValue.and.returnValue(mockPromise(mockMessage));
      // act
      await productComponent.callPromise();
      fixture.detectChanges();
      // assert
      expect(productComponent.rta).toEqual(mockMessage);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    });

    it('should show "my mock Message" in <p> when btn was click', fakeAsync(() => {
      // arrange
      const mockMessage = 'my mock Message';
      valueService.getPromiseValue.and.returnValue(mockPromise(mockMessage));
      // const btnDebug = fixture.debugElement.query(By.css('.btn-promise'));
      const btnDebug = queryById(fixture, 'btn-promise');
      btnDebug.triggerEventHandler('click', null);
      tick(); // ya que no estamos llamando directamente al metodo y
      // no podemos controlar ese asyncronismo por eso se utiliza el tick
      // act
      fixture.detectChanges();
      // const pDebug = fixture.debugElement.query(By.css('.rta'));
      const pDebug = queryById(fixture, 'rta');
      const p: HTMLElement = pDebug.nativeElement;
      // assert
      expect(productComponent.rta).toEqual(mockMessage);
      expect(p.textContent).toEqual(mockMessage);
    }));
  });
});
