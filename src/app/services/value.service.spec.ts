import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // colocamos los modulos que queramos
      providers: [ValueService],
    });

    // colocamos el modulo que queremos inicializar
    service = TestBed.inject(ValueService);
    // ya no es necesario inicializar asi gracias a testBed
    // service = new ValueService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('Test for setValue', () => {
    it('should change the Value ', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('new Value');
      expect(service.getValue()).toBe('new Value');
    });
  });
  describe('Test for getPromiseValue with async ', () => {
    it('shold return "promise value" from async/await', async () => {
      const rta = await service.getPromiseValue();
      expect(rta).toBe('promise value');
    });
  });

  describe('Test for getPromiseValue with then', () => {
    it('should return "promise value" from promise', (doneFn) => {
      service.getPromiseValue().then((value) => {
        // assert
        expect(value).toBe('promise value');
        // doneFn es para terminar la prueba
        // ya que haya terminado de resolver la promesa
        doneFn();
      });
    });
  });

  describe('Test for getObservablevalue with subscribe', () => {
    it('should retun "observable value"', (doneFn) => {
      service.getObservable().subscribe((value) => {
        expect(value).toBe('observable value');
        doneFn();
      });
    });
  });
});
