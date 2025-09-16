import {Injectable} from '@angular/core';
import {RxStomp, RxStompConfig} from '@stomp/rx-stomp';
import {notificationServiceRxStompConfig} from "./notification-service-rx-stomp.config";

@Injectable({
  providedIn: 'root',
})
export class NotificationServiceRxStompService extends RxStomp {

  constructor() {
    super();
  }

  startService(currentUserAccessToken: string): void {
    const config: RxStompConfig = {
      ...notificationServiceRxStompConfig,
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
