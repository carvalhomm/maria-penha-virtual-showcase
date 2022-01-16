import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstJuizoValorPageComponent } from './first-juizo-valor-page.component';

describe('FirstJuizoValorPageComponent', () => {
  let component: FirstJuizoValorPageComponent;
  let fixture: ComponentFixture<FirstJuizoValorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstJuizoValorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstJuizoValorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
