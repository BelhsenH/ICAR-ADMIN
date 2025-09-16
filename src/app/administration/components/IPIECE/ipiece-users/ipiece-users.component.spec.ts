import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpieceUsersComponent } from './ipiece-users.component';

describe('IpieceUsersComponent', () => {
  let component: IpieceUsersComponent;
  let fixture: ComponentFixture<IpieceUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpieceUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpieceUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
