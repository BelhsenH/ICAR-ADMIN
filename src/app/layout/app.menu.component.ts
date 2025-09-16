import {Component, OnInit} from '@angular/core';
import {LayoutService} from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}
        ]
      },
      {
        label: 'ICAR',
        items: [
          {label: 'User list', icon: 'pi pi-fw pi-list', routerLink: ['/admin/icar-users']}
        ]
      },
      {
        label: 'IREPAIR',
        items: [
          {label: 'User list', icon: 'pi pi-fw pi-list', routerLink: ['/admin/irepair-users']}
        ]
      },
      {
        label: 'IPIECE',
        items: [
          {label: 'User list', icon: 'pi pi-fw pi-list', routerLink: ['/admin/ipiece-users']}
        ]
      }
    ];
  }
}
