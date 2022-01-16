import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondAnalysisPageComponent } from './second-analysis-page.component';

describe('SecondAnalysisPageComponent', () => {
  let component: SecondAnalysisPageComponent;
  let fixture: ComponentFixture<SecondAnalysisPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondAnalysisPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondAnalysisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
