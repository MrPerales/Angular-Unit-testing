import { TestBed } from '@angular/core/testing';
import { ProductsService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';

fdescribe('Product Service ', () => {
  let productService: ProductsService;
  // para poder hacer moking HttpTestingController
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      // importamos el client testing ya que el servicio lo ocupa
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    productService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('test for getAllSimple', () => {
    it('should return a product List ', (doneFn) => {
      // arrange
      const mockData: Product[] = generateManyProducts(2);
      // Act
      productService.getAllSimple().subscribe((data) => {
        // Assert
        // ya recibiriamos la mockData por la htto config
        expect(data.length).toEqual(data.length);
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      // expectOne => url que va a tomar encuenta para que no se hagan peticiones reales a la api
      // cuando vea que hacemos peticion a esa api lo va interceptar por asi decirlo
      const req = httpController.expectOne(url);
      // reemplzamos la info
      req.flush(mockData);
      // varificamos si esta montado el mockData correctamente
      httpController.verify();
    });
  });

  describe('test for getAll', () => {
    it('should return a product List', (doneFn) => {
      const mockData: Product[] = generateManyProducts(3);

      productService.getAll().subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      // http Config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });

    it('should retur products with taxes', (doneFn) => {
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100*.19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200*.19 = 38
        },
        {
          ...generateOneProduct(),
          price: 0, // 0*.19 = 0
        },
        {
          ...generateOneProduct(),
          price: -200, // -200*.19 = 38
        },
      ];
      //
      productService.getAll().subscribe((data) => {
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);

        doneFn();
      });
      // http Config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });
    // params
    it('should send query params width limit 10 offset 2', (doneFn) => {
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 2;
      productService.getAll(limit, offset).subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      // http Config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      // obtenemos los parametros para testear
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);

      httpController.verify();
    });

    it('should send query params width limit 0 offset 0', (doneFn) => {
      const mockData: Product[] = generateManyProducts(3);
      const limit = 0;
      const offset = 0;
      productService.getAll(limit, offset).subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      // http Config
      // quitamos el limit y el offset ya que son 0
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      // obtenemos los parametros para testear
      const params = req.request.params;
      expect(params.get('limit')).toBeNull();
      expect(params.get('offset')).toBeNull();
      httpController.verify();
    });
  });
});
