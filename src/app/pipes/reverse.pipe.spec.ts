import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('roma');
    expect(rta).toEqual('amor');
  });
  it('should transform "123" to "321"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('123');
    expect(rta).toEqual('321');
  });
});

//

@Component({
  standalone: true,
  imports: [FormsModule, ReversePipe],
  template: `
    <h5 class="title">{{ 'amor' | reverse }}</h5>
    <input [(ngModel)]="text" />
    <p>{{ text | reverse }}</p>
  `,
})
class HostComponent {
  text = '';
}

describe('ReversePipe from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should the h5 be "roma"', () => {
    const h5Debug: DebugElement = fixture.debugElement.query(By.css('.title'));
    const h5Element: HTMLElement = h5Debug.nativeElement;
    expect(h5Element.textContent).toEqual('roma');
  });

  it('should apply reverse pipe when typing in the  <input> ', () => {
    const inputDebug: DebugElement = fixture.debugElement.query(
      By.css('input')
    );
    const pDebug: DebugElement = fixture.debugElement.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;
    expect(pElement.textContent).toEqual(''); // vacio  ya que en el comoponente se inicializa en vacio

    const inputElement: HTMLInputElement = inputDebug.nativeElement;

    inputElement.value = 'hola'; //aloh
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(pElement.textContent).toEqual('aloh');
  });
});
