import {SubscriptionServiceRxStompService} from "./subscription-service-rx-stomp.service";
import {subscriptionServiceRxStompConfig} from "./subscription-service-rx-stomp.config";

export function subscriptionServiceRxStompServiceFactory() {
  const rxStomp = new SubscriptionServiceRxStompService();
  rxStomp.configure(subscriptionServiceRxStompConfig);
  // rxStomp.activate();
  return rxStomp;
}
