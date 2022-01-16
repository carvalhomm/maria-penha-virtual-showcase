import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondRiscoPageComponent } from './second-risco-page.component';

describe('SecondRiscoPageComponent', () => {
  let component: SecondRiscoPageComponent;
  let fixture: ComponentFixture<SecondRiscoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondRiscoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondRiscoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
