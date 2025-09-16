import {Injectable} from '@angular/core';
import {RxStomp, RxStompConfig} from '@stomp/rx-stomp';
import {bookingServiceRxStompConfig} from "./booking-service-rx-stomp.config";

@Injectable({
  providedIn: 'root',
})
export class BookingServiceRxStompService extends RxStomp {

  constructor() {
    super();
  }

  startService(currentUserAccessToken: string): void {
    const config: RxStompConfig = {
      ...bookingServiceRxStompConfig,
      connectHeaders: {
        Authorization: `Bearer ${currentUserAccessToken}`
      }
    };
    this.configure(config);
    this.activate();
  }

  async stopService() {
    await this.deactivate();
  }

}
