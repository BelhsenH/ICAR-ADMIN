import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdministrationComponent} from './administration.component';
import {AdministrationRoutingModule} from './administration-routing.module';
import {DialogModule} from 'primeng/dialog';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {InputSwitchModule} from 'primeng/inputswitch';
import {GalleriaModule} from 'primeng/galleria';
import {ImageModule} from 'primeng/image';
import {AccordionModule} from 'primeng/accordion';
import {MenuModule} from 'primeng/menu';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';
import {TimelineModule} from 'primeng/timeline';
import {MessagesModule} from "primeng/messages";
import {TabViewModule} from "primeng/tabview";
import {SharedModule} from "../shared/shared.module";
import {RippleModule} from "primeng/ripple";
import {BadgeModule} from "primeng/badge";
import { IcarUsersComponent } from './components/ICAR/icar-users/icar-users.component';
import { IcarUsersDetailsComponent } from './components/ICAR/icar-users-details/icar-users-details.component';
import { IrepairUsersComponent } from './components/IREPAIR/irepair-users/irepair-users.component';
import {IpieceUsersComponent} from "./components/IPIECE/ipiece-users/ipiece-users.component";
import {MultiSelectModule} from "primeng/multiselect";
import { IpieceUsersDetailsComponent } from './components/IPIECE/ipiece-users-details/ipiece-users-details.component';
import {CheckboxModule} from "primeng/checkbox";
import { PromoCodeComponent } from './components/PromoCode/promo-code/promo-code.component';
import {CampaignsAddComponent} from "./components/PromoCode/Compaigns/compains-add/compaigns-add.component";
import {CampaignsListComponent} from "./components/PromoCode/Compaigns/compaigns-list/compaigns-list.component";


@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    PdfViewerModule,
    FormsModule,
    DialogModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    InputSwitchModule,
    GalleriaModule,
    ImageModule,
    AccordionModule,
    MenuModule,
    InputTextareaModule,
    CalendarModule,
    MessagesModule,
    TimelineModule,
    TabViewModule,
    SharedModule,
    RippleModule,
    BadgeModule,
    MultiSelectModule,
    CheckboxModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdministrationComponent,
    IcarUsersComponent,
    IcarUsersDetailsComponent,
    IrepairUsersComponent,
    IpieceUsersComponent,
    IpieceUsersDetailsComponent,
    PromoCodeComponent,
    CampaignsListComponent,
    CampaignsAddComponent
  ]
})
export class AdministrationModule {
}
