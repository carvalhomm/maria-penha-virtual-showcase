import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdRiscoPageComponent } from './third-risco-page.component';

describe('ThirdRiscoPageComponent', () => {
  let component: ThirdRiscoPageComponent;
  let fixture: ComponentFixture<ThirdRiscoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdRiscoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdRiscoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
