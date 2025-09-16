import {Component} from '@angular/core';
import {DateService} from "../../service/date/date.service";
import {Router} from "@angular/router";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {PaymentTransaction} from "../../models/billing/payment-transaction.model";
import * as moment from "moment-timezone";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent {
  paymentTransaction!: PaymentTransaction;
  readonly moment = moment;

  constructor(public dateService: DateService,
              private config: DynamicDialogConfig,
              private ref: DynamicDialogRef,
              private route: Router) {
    this.paymentTransaction = config.data.paymentSelected;
    console.log(config.data.paymentTransaction, "config.data.paymentTransaction")
  }

  public closeModal(): void {
    this.ref.close();
  }

  displayDateFromUnixEpochAndUserTimeZone(
    unixEpochTimeInSeconds: number
  ): string {
    return moment.utc(unixEpochTimeInSeconds * 1000).format('LLL');
  }

  public async goToUserDetails(idSelected: string): Promise<void> {
    console.log(`/admin/users/details/` + idSelected, 'idSelected')
    await this.route.navigateByUrl(
      `/admin/users/details/` + idSelected
    ).then(() => this.closeModal()
    );

  }

  public async goToBookingDetails(idSelected: string): Promise<void> {
    console.log(`/admin/bookings/details/` + idSelected, 'idSelected')
    await this.route.navigateByUrl(
      `/admin/bookings/details/` + idSelected
    ).then(() => this.closeModal()
    );
  }
}
