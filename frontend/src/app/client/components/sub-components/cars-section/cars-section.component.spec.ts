import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsSectionComponent } from './cars-section.component';

describe('CarsSectionComponent', () => {
  let component: CarsSectionComponent;
  let fixture: ComponentFixture<CarsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
