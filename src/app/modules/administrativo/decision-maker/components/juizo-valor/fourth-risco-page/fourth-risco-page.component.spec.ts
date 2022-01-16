import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthRiscoPageComponent } from './fourth-risco-page.component';

describe('FourthRiscoPageComponent', () => {
  let component: FourthRiscoPageComponent;
  let fixture: ComponentFixture<FourthRiscoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourthRiscoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourthRiscoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
