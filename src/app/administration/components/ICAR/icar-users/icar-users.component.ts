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
  filteredUsers: Partial<ICarUsers>[] = [];
  user!: Partial<ICarUsers>;
  selectedUsers: Partial<ICarUsers>[] = [];
  items!: MenuItem[];
  submitted: boolean = false;
  cols: any[] = [];
  showInactive: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private icarUsersService: ICarUsersService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  hideDialog() {
    this.submitted = false;
  }

  updateSelectedUser(user: Partial<ICarUsers>) {
    this.user = {...user};
  }

  filterUsers() {
    // filtre selon le toggle
    const filtered = this.showInactive ? this.users : this.users.filter(u => !u.archived);

    // recrée une nouvelle référence de tableau pour PrimeNG
    this.filteredUsers = [...filtered];
  }

  toggleShowInactive() {
    this.showInactive = !this.showInactive;
    this.filterUsers();
  }

  updateMenuItems(user: Partial<ICarUsers>) {
    this.items = [
      {
        label: 'Edit',
        icon: 'pi pi-user-edit',
        command: () => {
          this.editUser(user._id!);
        },
      },
      {
        label: 'View details',
        icon: 'pi pi-user',
        command: () => {
          this.goToUserDetails(user._id!);
        },
      },
      {
        label: user.archived ? 'Unarchive' : 'Archive',
        icon: user.archived ? 'pi pi-refresh' : 'pi pi-archive',
        command: () => {
          user.archived ? this.unarchiveUser(user) : this.archiveUser(user);
        },
      }
    ];
  }


  goToUserDetails(idSelected: string) {
    this.route.navigateByUrl(`/admin/icar-users/details/${idSelected}`);
  }

  editUser(idSelected: string) {
    this.route.navigateByUrl(`/admin/users/update/${idSelected}`);
  }

  getAllUsers(): void {
    this.icarUsersService.getAllUsers().subscribe((data) => {
      this.users = data.body!;
      this.filteredUsers = [...this.users]; // affichage initial
      this.filterUsers(); // <--- applique le filtre initial

    });
  }

  archiveUser(user: Partial<ICarUsers>) {
    this.icarUsersService.archiveUser(user._id!).subscribe(() => {
      user.archived = true;
      this.filterUsers(); // rafraîchir le tableau
    });
  }

  unarchiveUser(user: Partial<ICarUsers>) {
    this.icarUsersService.unarchiveUser(user._id!).subscribe(() => {
      user.archived = false;
      this.filterUsers(); // rafraîchir le tableau
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
