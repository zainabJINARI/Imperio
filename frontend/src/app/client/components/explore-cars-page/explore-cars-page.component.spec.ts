import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreCarsPageComponent } from './explore-cars-page.component';

describe('ExploreCarsPageComponent', () => {
  let component: ExploreCarsPageComponent;
  let fixture: ComponentFixture<ExploreCarsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreCarsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreCarsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
