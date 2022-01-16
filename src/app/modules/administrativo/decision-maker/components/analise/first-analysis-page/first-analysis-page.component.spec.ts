import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstAnalysisPageComponent } from './first-analysis-page.component';

describe('FirstAnalysisPageComponent', () => {
  let component: FirstAnalysisPageComponent;
  let fixture: ComponentFixture<FirstAnalysisPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstAnalysisPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstAnalysisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
