import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaignsListComponent } from './compaigns-list.component';

describe('CompaignsAddComponent', () => {
  let component: CompaignsListComponent;
  let fixture: ComponentFixture<CompaignsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaignsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaignsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
