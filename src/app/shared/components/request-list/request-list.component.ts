import {Component, Input} from '@angular/core';
import {IDeliveryRequest} from "../../models/booking/delivery-request.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent {

  @Input() requests: IDeliveryRequest[] = [];

  constructor(private route: Router) {
  }

  public goToRequestDetails(idSelected: string): void {
    console.log(`/admin/requests/details/` + idSelected, 'idSelected')
    this.route.navigateByUrl(
      `/admin/requests/details/` + idSelected
    );
  }
}
