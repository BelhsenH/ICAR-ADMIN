import {Component, OnDestroy, OnInit} from '@angular/core';
import { IcarVehicule } from "../../../../shared/models/icar-users/icar-vehicule.model";
import { ICarVehiculeService } from "../../../../shared/service/icar-users/icar-vehicule.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Table } from "primeng/table";
import { MenuItem } from "primeng/api";
import {Subject} from "rxjs";

@Component({
  selector: 'app-icar-users-details',
  templateUrl: './icar-users-details.component.html',
  styleUrls: ['./icar-users-details.component.scss']
})
export class IcarUsersDetailsComponent implements OnInit, OnDestroy {
  cars: IcarVehicule[] = [];
  car!: IcarVehicule;
  carDialog: boolean = false;
  userId!: string;
  loading = true;
  items!: MenuItem[];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private carService: ICarVehiculeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';

    if (this.userId) {
      this.carService.getCarsByUser(this.userId).subscribe({
        next: (res) => {
          this.cars = res.data ?? [];
          this.loading = false;
        },
        error: (err) => console.error('Erreur récupération voitures', err)
      });
    }
  }

  viewCarDetails(car: IcarVehicule) {
    this.car = { ...car }; // clone pour sécurité
    this.carDialog = true;
  }

  hideDialog() {
    this.carDialog = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  updateMenuItems(car: IcarVehicule) {
    this.items = [
      {
        label: 'View Details',
        icon: 'pi pi-eye',
        command: () => this.viewCarDetails(car)
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editCar(car._id)
      }
    ];
  }

  editCar(id: string) {
    this.router.navigateByUrl(`/admin/users/update/${id}`);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
