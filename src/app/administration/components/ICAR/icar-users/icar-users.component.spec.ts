import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcarUsersComponent } from './icar-users.component';

describe('IcarUsersComponent', () => {
  let component: IcarUsersComponent;
  let fixture: ComponentFixture<IcarUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcarUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcarUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
