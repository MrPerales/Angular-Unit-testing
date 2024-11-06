import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

fdescribe('MapsService', () => {
  let mapsService: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsService],
    });
    mapsService = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(mapsService).toBeTruthy();
  });

  describe('test for getCurrentPosition', () => {
    it('should save the cords', () => {
      // arrange
      // spiamos la api del navegador y su metodo
      // callfake => reemplazar la funcion getCurrentPosition osease que creas tu propia version de ese metodo
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
        (successFn) => {
          // mockeamos como nos regresa normalmente ese metodo
          // podemos buscar en su doc o hacer un console.log
          const mockGeolocation = {
            coords: {
              accuracy: 0,
              altitude: 0,
              altitudeAccuracy: 0,
              heading: 0,
              latitude: 100,
              longitude: 500,
              speed: 0,
            },
            timestamp: 0,
          };

          successFn(mockGeolocation); //
        }
      );
      // act
      mapsService.getCurrentPosition();
      // assert
      expect(mapsService.center.lat).toEqual(100);
      expect(mapsService.center.long).toEqual(500);
    });
  });
});
