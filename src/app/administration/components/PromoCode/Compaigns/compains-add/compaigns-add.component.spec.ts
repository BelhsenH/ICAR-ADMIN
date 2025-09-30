import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaignsAddComponent } from './compaigns-add.component';

describe('CompaignsAddComponent', () => {
  let component: CompaignsAddComponent;
  let fixture: ComponentFixture<CompaignsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaignsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaignsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
