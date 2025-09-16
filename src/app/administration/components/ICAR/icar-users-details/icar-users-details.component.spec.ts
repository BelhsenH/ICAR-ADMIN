import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcarUsersDetailsComponent } from './icar-users-details.component';

describe('IcarUsersDetailsComponent', () => {
  let component: IcarUsersDetailsComponent;
  let fixture: ComponentFixture<IcarUsersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcarUsersDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcarUsersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
