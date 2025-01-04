import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersComponent } from './others.component';
import { ProductsService } from '../../services/product.service';
import { generateManyProducts } from '../../models/product.mock';
import { mockObservable } from '../../../testing';

describe('OthersComponent', () => {
  let component: OthersComponent;
  let fixture: ComponentFixture<OthersComponent>;
  let productService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getAll',
    ]);
    await TestBed.configureTestingModule({
      imports: [OthersComponent],
      providers: [{ provide: ProductsService, useValue: productServiceSpy }],
    }).compileComponents();
    fixture = TestBed.createComponent(OthersComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    // mokeamos al pricnipio ya que se ejecuta en el ngOnInit
    const productMock = generateManyProducts(3);
    productService.getAll.and.returnValue(mockObservable(productMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(productService.getAll).withContext('call').toHaveBeenCalled();
    expect(component).withContext('create').toBeTruthy();
  });
});
