import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  constructor() {}
  center = { lat: 0, long: 0 };
  getCurrentPosition() {
    // api del navegador la cual no esta injectada
    navigator.geolocation.getCurrentPosition((resp) => {
      const { latitude, longitude } = resp.coords;
      console.log(resp);

      // asignamos los valores
      this.center = { lat: latitude, long: longitude };
    });
  }
}
