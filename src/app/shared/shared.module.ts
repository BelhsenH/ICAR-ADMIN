import {NgModule} from '@angular/core';
import {BookingListComponent} from './components/booking-list/booking-list.component';
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {OfferListComponent} from './components/offer-list/offer-list.component';
import {RequestListComponent} from './components/request-list/request-list.component';
import {PaymentListComponent} from './components/payment-list/payment-list.component';
import {PaymentDetailsComponent} from './components/payment-details/payment-details.component';
import {
  UserBankAccountListComponent
} from './components/external-accounts/user-bank-account-list/user-bank-account-list.component';
import {DialogModule} from "primeng/dialog";
import {ImageModule} from "primeng/image";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {DropdownModule} from "primeng/dropdown";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {CurrencyTransformPipe} from "./pipes/currency-transform.pipe";
import {FormatTimePipe} from "./pipes/format-time.pipe";
import {FormatPartDatePipe} from "./pipes/format-part-date.pipe";
import {FormatFullDatePipe} from "./pipes/format-full-date.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TooltipModule,
    DialogModule,
    ImageModule,
    PdfViewerModule,
    DropdownModule,
    InputSwitchModule
  ],
  declarations: [
    BookingListComponent,
    OfferListComponent,
    RequestListComponent,
    PaymentListComponent,
    PaymentDetailsComponent,
    UserBankAccountListComponent,
    CurrencyTransformPipe,
    FormatTimePipe,
    FormatPartDatePipe,
    FormatFullDatePipe
  ],
  exports: [
    BookingListComponent,
    RequestListComponent,
    OfferListComponent,
    PaymentListComponent,
    UserBankAccountListComponent,
    CurrencyTransformPipe,
    FormatTimePipe,
    FormatPartDatePipe,
    FormatFullDatePipe
  ],
  providers: []
})
export class SharedModule {
}
