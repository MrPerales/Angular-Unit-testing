import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, Router, RouterLinkWithHref } from '@angular/router';
import { clickElement, query, queryAllByDirective } from '../testing';

@Component({
  selector: 'pico-preview',
  standalone: true,
  template: '<div></div>',
})
export class PicoPreviewComponentMock {}
@Component({
  selector: 'app-people',
  standalone: true,
  template: '<div></div>',
})
export class PeopleComponentMock {}
@Component({
  selector: 'app-others',
  standalone: true,
  template: '<div></div>',
})
export class OthersComponentMock {}
const routes = [
  {
    path: 'pico-preview',
    component: PicoPreviewComponentMock,
  },
  {
    path: 'people',
    component: PeopleComponentMock,
  },
  {
    path: 'others',
    component: OthersComponentMock,
  },
];

fdescribe('AppComponent Integration Test', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        PicoPreviewComponentMock,
        PeopleComponentMock,
        OthersComponentMock,
      ],
      providers: [provideRouter(routes)],
      schemas: [NO_ERRORS_SCHEMA], //para ignorar los warnings de los componentes no declarados
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(fakeAsync(() => {
    router = TestBed.inject(Router);
    router.initialNavigation();
    tick(); // espera hasta que acabe la navegacion
    fixture.detectChanges(); //ngOnInit
  }));
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should there are 6 routerLinks', () => {
    const links = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(links.length).toEqual(6);
  });
  it('should render OthersComponent when clicked', fakeAsync(() => {
    clickElement(fixture, 'others-link', true); //navegamos a la ruta others
    tick(); //esperamos a que cargue el componente others
    fixture.detectChanges(); //ngOnInit -OthersComponents
    expect(router.url).toEqual('/others');
    // comporbamos si el componente es el esperado en la ruta others
    const componentElement = query(fixture, 'app-others');
    expect(componentElement).not.toBeNull();
  }));
});
