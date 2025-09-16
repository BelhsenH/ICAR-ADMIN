import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {Table} from "primeng/table";
import {IPieceUsers} from "../../../../shared/models/ipiece-users/ipiece-user.model";
import {IPieceUsersService} from "../../../../shared/service/ipiece-users/ipiece-users.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-ipiece-users',
  templateUrl: './ipiece-users.component.html',
  styleUrls: ['./ipiece-users.component.scss']
})
export class IpieceUsersComponent implements OnInit, OnDestroy {
  users: Partial<IPieceUsers>[] = [];
  user!: Partial<IPieceUsers>;
  selectedUsers: Partial<IPieceUsers>[] = [];
  userDialog: boolean = false;
  items!: MenuItem[];
  submitted: boolean = false;
  cols: any[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private ipieceUsersService: IPieceUsersService,
    private route: Router,
  ) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  /*openNew() {
    this.submitted = false;
    this.route.navigateByUrl(`/admin/users/add`);
  }*/

  onGlobalFilter(table: Table, event: Event) {
    console.log((event.target as HTMLInputElement).value);
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }


  updateSelectedUser(user: any) {
    this.user = {...user};
  }

  updateMenuItems(user: Partial<IPieceUsers>) {
    this.items = [
      {
        label: 'Edit',
        icon: 'pi pi-user-edit',
        command: () => {
          this.editUser(this.user._id!);
        },
      },
      {
        label: 'View details',
        icon: 'pi pi-user',
        command: () => {
          this.viewUserDetails();
        },
      },
    ];
  }

  viewUserDetails(): void {
    this.userDialog = true;
  }


  editUser(idSelected: string) {
    this.route.navigateByUrl(`/admin/users/update/` + idSelected);
  }

/*
  saveUser() {
    this.submitted = true;

  }
*/
  getAllUsers(): void {
    this.ipieceUsersService
      .getAllUsers()
      .subscribe((data) => {
        this.users = data.body!;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
