import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComarcaFormComponent } from './comarca-form.component';

describe('ComarcaFormComponent', () => {
  let component: ComarcaFormComponent;
  let fixture: ComponentFixture<ComarcaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComarcaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComarcaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
