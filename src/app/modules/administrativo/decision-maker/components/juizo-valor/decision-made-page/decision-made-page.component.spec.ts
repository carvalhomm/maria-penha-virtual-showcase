import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionMadePageComponent } from './decision-made-page.component';

describe('DecisionMadePageComponent', () => {
  let component: DecisionMadePageComponent;
  let fixture: ComponentFixture<DecisionMadePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecisionMadePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionMadePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
