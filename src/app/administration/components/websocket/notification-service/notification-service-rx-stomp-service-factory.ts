import {NotificationServiceRxStompService} from "./notification-service-rx-stomp.service";
import {notificationServiceRxStompConfig} from "./notification-service-rx-stomp.config";

export function notificationServiceRxStompServiceFactory() {
  const rxStomp = new NotificationServiceRxStompService();
  rxStomp.configure(notificationServiceRxStompConfig);
  // rxStomp.activate();
  return rxStomp;
}
