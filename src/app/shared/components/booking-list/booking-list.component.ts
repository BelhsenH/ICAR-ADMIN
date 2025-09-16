import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {IBooking} from "../../models/booking/booking.model";

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent {

  @Input() bookings: IBooking[] = [];


  constructor(private route: Router) {
  }

  public goToBookingDetails(idSelected: string): void {
    console.log(`/admin/bookings/details/` + idSelected, 'idSelected')
    this.route.navigateByUrl(
      `/admin/bookings/details/` + idSelected
    );
  }
}
