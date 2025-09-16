import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {Table} from "primeng/table";
import {IRepairUsers} from "../../../../shared/models/irepair-users/irepair.users.model";
import {IRepairUsersService} from "../../../../shared/service/irepair-users/irepair-users.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-irepair-users',
  templateUrl: './irepair-users.component.html',
  styleUrls: ['./irepair-users.component.scss']
})
export class IrepairUsersComponent implements OnInit, OnDestroy {

  users: Partial<IRepairUsers>[] = [];
  user!: Partial<IRepairUsers>;
  selectedUsers: Partial<IRepairUsers>[] = [];
  userDialog: boolean = false;
  items!: MenuItem[];
  typeServiceOptions: { label: string; value: string }[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  private destroy$: Subject<void> = new Subject<void>();


  constructor(
    private irepairUsersService: IRepairUsersService,
    private route: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.user?.typeService?.length) {
      this.typeServiceOptions = this.user.typeService.map(s => ({ label: s, value: s }));
    }
    this.getAllUsers();
  }
/*
  openNew() {
    this.submitted = false;
    this.route.navigateByUrl(`/admin/users/add`);
  }
*/
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
    if (this.user.typeService?.length) {
      this.typeServiceOptions = this.user.typeService.map(s => ({ label: s, value: s }));
    } else {
      this.typeServiceOptions = [];
    }
  }

  updateMenuItems(user: Partial<IRepairUsers>) {
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

  }*/

  getAllUsers(): void {
    this.irepairUsersService
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
