import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { CardProductComponent } from '../card-product/card-product.component';
import { ProductsService } from '../../services/product.service';
import { generateManyProducts } from '../../models/product.mock';
import { defer, of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ValueService } from '../../services/value.service';

fdescribe('ProductsComponent', () => {
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
    productService.getAll.and.returnValue(of(producstMock));
    fixture.detectChanges(); //ngOnInit
  });

  it('should create', () => {
    expect(productComponent).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('test for getAllProducts', () => {
    it('should return product list from service', () => {
      // arrange
      const producstMock = generateManyProducts(10);
      productService.getAll.and.returnValue(of(producstMock));
      //se agrega un contador ya que en el beforeEach ya tenemos una cierta cantidad de productos
      // y para que no falle solo los agregamos en el expect
      const countPrev = productComponent.products.length;
      const productDebug: DebugElement = fixture.debugElement.query(
        By.css('app-card-product figure figcaption')
      );
      const figcaption: HTMLElement = productDebug.nativeElement;

      // act
      productComponent.getAllProducts();
      fixture.detectChanges();
      // assert
      expect(productComponent.products.length).toEqual(
        producstMock.length + countPrev
      );
      // render
      expect(figcaption).toBeTruthy();
    });

    it('should change the status "loading" => "success"', fakeAsync(() => {
      // arrenge
      const producstMock = generateManyProducts(10);
      productService.getAll.and.returnValue(
        // defer => emula la demora ya que el observable se crea hasta que te suscribes a el
        //emulamos una promesa para no usar un of el cual haria que se suscriba y porque vamos a usar el tick
        defer(() => Promise.resolve(producstMock))
      );

      // act
      productComponent.getAllProducts();
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
      productService.getAll.and.returnValue(
        defer(() => Promise.reject('error'))
      );
      // act
      productComponent.getAllProducts();
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
      valueService.getPromiseValue.and.returnValue(
        Promise.resolve(mockMessage)
      );
      // act
      await productComponent.callPromise();
      fixture.detectChanges();
      // assert
      expect(productComponent.rta).toEqual(mockMessage);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    });
  });
});
