import {BookingServiceRxStompService} from "./booking-service-rx-stomp.service";
import {bookingServiceRxStompConfig} from "./booking-service-rx-stomp.config";

export function bookingServiceRxStompServiceFactory() {
  const rxStomp = new BookingServiceRxStompService();
  rxStomp.configure(bookingServiceRxStompConfig);
  // rxStomp.activate();
  return rxStomp;
}
