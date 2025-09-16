import {Component, Input} from '@angular/core';
import {PaymentTransaction} from "../../models/billing/payment-transaction.model";
import {PaymentDetailsComponent} from "../payment-details/payment-details.component";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
  providers: [DialogService],
})
export class PaymentListComponent {
  @Input() payments: PaymentTransaction[] = [];

  constructor(public dialogService: DialogService,) {
  }

  public goToPaymentDetails(paymentSelected: PaymentTransaction, width: string = "90%",): void {
    const ref = this.dialogService.open(PaymentDetailsComponent, {
      width: width,
      header: "Payment Transaction Details",
      data: {
        paymentSelected: paymentSelected,
      },
    });
    ref.onClose.subscribe((data: {}) => {
    });
  }
}
