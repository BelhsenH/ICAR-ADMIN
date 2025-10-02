import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingCompanyComponent } from './advertising-company.component';

describe('CompaignsAddComponent', () => {
  let component: AdvertisingCompanyComponent;
  let fixture: ComponentFixture<AdvertisingCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisingCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertisingCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
