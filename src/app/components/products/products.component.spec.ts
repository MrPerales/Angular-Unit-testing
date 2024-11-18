import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { CardProductComponent } from '../card-product/card-product.component';
import { ProductsService } from '../../services/product.service';
import { generateManyProducts } from '../../models/product.mock';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('ProductsComponent', () => {
  let productComponent: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>; //TiPADO de spy

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getAll',
    ]); //spy
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, CardProductComponent],
      providers: [{ provide: ProductsService, useValue: productServiceSpy }], //
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    productComponent = fixture.componentInstance;
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>; //productService como spia

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
  });
});
