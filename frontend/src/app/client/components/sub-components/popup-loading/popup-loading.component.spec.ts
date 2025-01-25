import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupLoadingComponent } from './popup-loading.component';

describe('PopupLoadingComponent', () => {
  let component: PopupLoadingComponent;
  let fixture: ComponentFixture<PopupLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
