import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {IDeliveryOffer} from "../../models/booking/delivery-offer.model";

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent {
  @Input() offers: IDeliveryOffer[] = [];

  constructor(private route: Router) {
  }

  public goToOfferDetails(idSelected: string): void {
    console.log(`/admin/offers/details/` + idSelected, 'idSelected')
    this.route.navigateByUrl(
      `/admin/offers/details/` + idSelected
    );
  }
}
