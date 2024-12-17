import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { ProductsService } from '../../../services/product.service';
import { provideRouter } from '@angular/router';
import { Location } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import {
  getText,
  getTextHarness,
  mockObservable,
  queryById,
} from '../../../../testing';
import { generateOneProduct } from '../../../models/product.mock';
import { By } from '@angular/platform-browser';

fdescribe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productService: jasmine.SpyObj<ProductsService>; //TiPADO de spy
  let location: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getOne',
    ]); //spy
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: Location, useValue: locationSpy },
        /////////////////////// config para usar ActivatedRoute
        provideRouter([
          {
            path: 'products/:id',
            component: ProductDetailComponent,
          },
        ]),
        provideLocationMocks(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);

    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>; //productService como

    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    // como esta en un ngOnInit tenemos que configurar antes de llamarlo "fixture.detectChanges()"
    const productId = '1';
    //Estamos utilizando RouterTestingHarness, una herramienta que facilita la prueba de rutas en Angular.
    // La función create() se llama para crear una instancia del arnés de pruebas
    const harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl(
      `products/${productId}`, //Esta es la URL a la que se navega
      ProductDetailComponent //Este es el componente que esperamos que se cargue cuando navegamos a la URL especificada.
    );
    // mokeamos el producto cambiandole el id
    const productMock = { ...generateOneProduct(), id: productId };
    productService.getOne.and.returnValue(mockObservable(productMock));

    fixture.detectChanges(); //ngOnInit start
    expect(component).toBeTruthy();
  });

  it('should render the title and price product in the DOM', async () => {
    const productId = '2';
    const productMock = {
      ...generateOneProduct(),
      id: productId,
    };
    productService.getOne.and.returnValue(mockObservable(productMock));

    const harness = await RouterTestingHarness.create(`products/${productId}`);
    fixture.detectChanges(); //ngOnInit start

    const titleText = getTextHarness(harness, 'title');
    const priceText = getTextHarness(harness, 'price');

    expect(titleText).toContain(productMock.title);
    expect(priceText).toContain(productMock.price);

    expect(productService.getOne).toHaveBeenCalledWith(productId);
  });
});
