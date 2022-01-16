import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstRiscoPageComponent } from './first-risco-page.component';

describe('FirstRiscoPageComponent', () => {
  let component: FirstRiscoPageComponent;
  let fixture: ComponentFixture<FirstRiscoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstRiscoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstRiscoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
