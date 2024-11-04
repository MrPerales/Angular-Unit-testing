import { TestBed } from '@angular/core/testing';
import { ProductsService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';
import { environment } from '../../environments/environment';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';

describe('Product Service ', () => {
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
  afterEach(() => {
    // varificamos si esta montado el mockData correctamente
    httpController.verify();
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
    });
  });

  describe('test for create', () => {
    it('should return a new Product', (doneFn) => {
      // arrange
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'create ',
        price: 123,
        description: 'blabla...',
        images: ['img'],
        categoryId: 1,
      };
      // act
      // {... dto } => para evitar problemas de mutacion para asi pasar la ref y no el valor
      productService.create({ ...dto }).subscribe((data) => {
        // assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http Config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      // obtenemos los parametros para testear
      const body = req.request.body;
      // comprobamos si nos mandan los campos correctos
      expect(body).toEqual(dto);
      expect(req.request.method).toBe('POST');
    });
  });

  describe('test for update', () => {
    it('should return update product', (doneFn) => {
      const productId = '1';
      const mockData = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'update',
        categoryId: 1,
        description: 'blabla....',
        images: ['img'],
        price: 1,
      };
      productService.update(productId, { ...dto }).subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      });
      // http Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toBe('PUT');
    });
  });

  describe('test for delete', () => {
    it('should delete a product', (doneFn) => {
      const productId = '1';
      const mockData = true; //ya que regresa un boolean
      productService.delete(productId).subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      });
      // http Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toBe('DELETE');
    });
  });
});
