import {Component, OnInit, OnDestroy} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {ICarUsersService} from "../../../../shared/service/icar-users/icar-users.service";
import {ICarUsers} from "../../../../shared/models/icar-users/icar-users.model";
import {Table} from "primeng/table";
import {Subject} from "rxjs";

@Component({
  selector: 'app-icar-users',
  templateUrl: './icar-users.component.html',
  styleUrls: ['./icar-users.component.scss']
})
export class IcarUsersComponent implements OnInit, OnDestroy {

  users: Partial<ICarUsers>[] = [];
  user!: Partial<ICarUsers>;
  selectedUsers: Partial<ICarUsers>[] = [];
  userDialog: boolean = false;
  items!: MenuItem[];
  submitted: boolean = false;
  cols: any[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private icarUsersService: ICarUsersService,
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

  updateMenuItems(user: Partial<ICarUsers>) {
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
          this.goToUserDetails(this.user._id!);
        },
      },
    ];
  }

  goToUserDetails(idSelected: string): void {
    this.route.navigateByUrl(`/admin/icar-users/details/` + idSelected);
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
    this.icarUsersService
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
