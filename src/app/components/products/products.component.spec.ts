import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { CardProductComponent } from '../card-product/card-product.component';
import { ProductsService } from '../../services/product.service';
import { generateManyProducts } from '../../models/product.mock';
import { of } from 'rxjs';

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
});
