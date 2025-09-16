import {Injectable} from '@angular/core';
import {RxStomp, RxStompConfig} from '@stomp/rx-stomp';
import {subscriptionServiceRxStompConfig} from "./subscription-service-rx-stomp.config";

@Injectable({
  providedIn: 'root',
})
export class SubscriptionServiceRxStompService extends RxStomp {

  constructor() {
    super();
  }

  startService(currentUserAccessToken: string): void {
    const config: RxStompConfig = {
      ...subscriptionServiceRxStompConfig,
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
