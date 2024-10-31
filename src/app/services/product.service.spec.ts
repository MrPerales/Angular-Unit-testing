import { TestBed } from '@angular/core/testing';
import { ProductsService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';
import { generateManyProducts } from '../models/product.mock';

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
});
