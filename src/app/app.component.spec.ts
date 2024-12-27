import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  template: '<div></div>',
})
export class BannerComponentMock {}

@Component({
  selector: 'app-footer',
  standalone: true,
  template: '<div></div>',
})
export class FooterComponentMock {}

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterLink,
        BannerComponentMock,
        FooterComponentMock,
      ],
      providers: [provideRouter([])],
      // schemas:[NO_ERRORS_SCHEMA] //para ignorar los warnings de los componentes no declarados
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should there are 6 routerLinks', () => {
    // fixture.detectChanges();

    const linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));
    const routes = linkDes.map((link) => link.injector.get(RouterLink));
    expect(routes.length).toEqual(6);
  });
  it('should there are 6 routerLinks and macht with routes', () => {
    // fixture.detectChanges();

    const linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));
    const routes = linkDes.map((link) => link.injector.get(RouterLink));
    expect(routes[0].href).toEqual('/');
    expect(routes[1].href).toEqual('/products');
    expect(routes[2].href).toEqual('/pico-preview');
    expect(routes[3].href).toEqual('/people');
    expect(routes[4].href).toEqual('/others');
    expect(routes[5].href).toEqual('/auth/register');
  });
});
