import {Component, OnInit} from '@angular/core';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {LayoutService} from './layout/service/app.layout.service';
import {combineLatest, Subject, Subscription} from "rxjs";
import {
  NotificationServiceRxStompService
} from "./administration/components/websocket/notification-service/notification-service-rx-stomp.service";
import {Message} from "@stomp/stompjs";
import {INotification} from "./shared/models/notification/notification.model";
import {CentralizedMessagesService} from "./shared/service/toast-messages/centralized-messages.service";
import {
  SubscriptionServiceRxStompService
} from "./administration/components/websocket/subscription-service/subscription-service-rx-stomp.service";
import {takeUntil} from "rxjs/operators";
import {User} from "./shared/models/user/user.model";
import {AuthenticationService} from "./core/auth/authentication.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  private notificationsSubscription: Subscription | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private primengConfig: PrimeNGConfig,
              private layoutService: LayoutService,
              private authenticationService: AuthenticationService,
              private centralizedMessagesService: CentralizedMessagesService,
              private messageService: MessageService,
              private notificationServiceRxStompService: NotificationServiceRxStompService,
              private subscriptionServiceRxStompService: SubscriptionServiceRxStompService,
  ) {
    authenticationService.checkAtStarting().subscribe();
  }

  ngOnInit() {
    this.primengConfig.ripple = false;       //enables core ripple functionality

    //optional configuration with the default configuration
    this.layoutService.config = {
      ripple: false,                      //toggles ripple on and off
      inputStyle: 'outlined',             //default style for input elements
      menuMode: 'static',                 //layout mode of the menu, valid values are "static" and "overlay"
      colorScheme: 'light',               //color scheme of the template, valid values are "light" and "dark"
      theme: 'lara-light-indigo',         //default component theme for PrimeNG
      scale: 14                           //size of the body font size to scale the whole application
    };
    this.listenToCentralizedMessages();
    this.listenToUserNotifications();
    this.listenToUserAccountSuspension();
  }

  listenToCentralizedMessages(): void {
    // subscribe to messages from all components
    this.centralizedMessagesService.onMessage().subscribe(message => {
      if (message) {
        this.messageService.add(message);
      } else {
        // clear messages when empty message received
        this.messageService.clear();
      }
    });
  }

  listenToUserNotifications(): void {
    combineLatest([
      this.authenticationService.currentUser$,
      this.notificationServiceRxStompService.connectionState$
    ]).subscribe(([user, rxStompState]) => {
      console.log(user, "user")
      console.log(rxStompState, "rxStompState")
      if ((!!user) && (rxStompState === 1)) {
        this.notificationsSubscription = this.notificationServiceRxStompService.watch(`/topic/notification-user-${user.id}`)
          .subscribe((message: Message) => {
            const notification: INotification = JSON.parse(message.body);
            console.log(notification, "_______notification________")
            this.messageService.clear();
            this.centralizedMessagesService.sendMessage({
              severity: 'info',
              summary: notification.resource.type,
              detail: notification.event,
              life: 8000,
            });
          });
      } else {
        this.notificationsSubscription?.unsubscribe();
        this.notificationsSubscription = undefined;
      }
    });
  }

  private listenToUserAccountSuspension(): void {
    combineLatest([
      this.authenticationService.currentUser$,
      this.subscriptionServiceRxStompService.connectionState$
    ]).pipe(
      takeUntil(this.destroy$))
      .subscribe(([user, rxStompState]) => {
        if ((!!user) && (rxStompState === 1)) {
          this.subscriptionServiceRxStompService.watch('/topic/user_account_suspension')
            .subscribe(async (message: Message) => {
              const suspendedUser: User = JSON.parse(message.body);
              if (user.id === suspendedUser.id) {
                await this.authenticationService.logout();
                this.centralizedMessagesService.sendMessage({
                  severity: 'info',
                  summary: "Sorry",
                  detail: "This account has been disabled",
                  life: 8000,
                });
              }
            });
        }

      });
  }
}
