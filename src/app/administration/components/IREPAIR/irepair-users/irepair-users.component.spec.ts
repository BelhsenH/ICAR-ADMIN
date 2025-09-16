import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrepairUsersComponent } from './irepair-users.component';

describe('IrepairUsersComponent', () => {
  let component: IrepairUsersComponent;
  let fixture: ComponentFixture<IrepairUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrepairUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrepairUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
