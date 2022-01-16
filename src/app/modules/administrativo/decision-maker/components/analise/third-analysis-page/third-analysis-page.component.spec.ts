import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdAnalysisPageComponent } from './third-analysis-page.component';

describe('ThirdAnalysisPageComponent', () => {
  let component: ThirdAnalysisPageComponent;
  let fixture: ComponentFixture<ThirdAnalysisPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdAnalysisPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdAnalysisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
