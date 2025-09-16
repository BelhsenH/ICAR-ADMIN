import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserBankAccountListComponent} from './user-bank-account-list.component';

describe('UserBankAccountListComponent', () => {
  let component: UserBankAccountListComponent;
  let fixture: ComponentFixture<UserBankAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserBankAccountListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserBankAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
