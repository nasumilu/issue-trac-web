import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverseGeocodePopupComponent } from './reverse-geocode-popup.component';

describe('ReverseGeocodePopupComponent', () => {
  let component: ReverseGeocodePopupComponent;
  let fixture: ComponentFixture<ReverseGeocodePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReverseGeocodePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReverseGeocodePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
