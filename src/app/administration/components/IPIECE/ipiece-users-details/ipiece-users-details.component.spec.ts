import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpieceUsersDetailsComponent } from './ipiece-users-details.component';

describe('IpieceUsersDetailsComponent', () => {
  let component: IpieceUsersDetailsComponent;
  let fixture: ComponentFixture<IpieceUsersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpieceUsersDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpieceUsersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
