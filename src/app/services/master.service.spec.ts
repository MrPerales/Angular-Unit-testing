import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { FakeValueService } from './value-fake-service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    // nombre del servicio , [nombre o nombres de los metodos ]
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [
        MasterService,
        {
          //ValueService va a ser una dependecia que vamos a spiar
          provide: ValueService,
          // va a spiar el modulo y metodo que le mandamos tipo jasmin
          useValue: spy,
        },
      ],
    });
    masterService = TestBed.inject(MasterService);
    // inicamos el spy
    valueServiceSpy = TestBed.inject(
      ValueService
    ) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });

  // it('should return "my value" from the real service ', () => {
  //   const valueService = new ValueService();
  //   const masterService = new MasterService(valueService);
  //   expect(masterService.getValue()).toBe('my value');
  // });

  // // with fakeService
  // it('should return "other value" from the fake service ', () => {
  //   const fakeValueService = new FakeValueService();
  //   // forzamos el tipado
  //   const masterService = new MasterService(
  //     fakeValueService as unknown as ValueService
  //   );
  //   expect(masterService.getValue()).toBe('fake value');
  // });
  // // with object
  // it('should return "other value" from the fake object ', () => {
  //   const fakeObject = {
  //     getValue: () => {
  //       return 'fake from object';
  //     },
  //   };
  //   // forzamos el tipado
  //   const masterService = new MasterService(fakeObject as ValueService);
  //   expect(masterService.getValue()).toBe('fake from object');
  // });

  // spies

  it('should call to getValue from ValueServices', () => {
    // solo retorna el valor lo cual no nos importa tanto en este test
    valueServiceSpy.getValue.and.returnValue('fake value');
    expect(masterService.getValue()).toBe('fake value');
    //fue llamado ?
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    // fue llamado n veces ?
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
