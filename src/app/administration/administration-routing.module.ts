import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IcarUsersComponent} from "./components/ICAR/icar-users/icar-users.component";
import {IcarUsersDetailsComponent} from "./components/ICAR/icar-users-details/icar-users-details.component";
import {IrepairUsersComponent} from "./components/IREPAIR/irepair-users/irepair-users.component";
import {IpieceUsersComponent} from "./components/IPIECE/ipiece-users/ipiece-users.component";

@NgModule({
  imports: [RouterModule.forChild([
    {path: 'icar-users', component: IcarUsersComponent},
    {path: 'icar-users/details/:id', component: IcarUsersDetailsComponent},
    {path: 'ipiece-users', component: IpieceUsersComponent},
    {path: 'irepair-users', component: IrepairUsersComponent},
  ])],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {
}
