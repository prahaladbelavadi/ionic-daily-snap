import { Component } from '@angular/core';
import { Platform } from "@ionic/angular";

import { Plugins } from "@capacitor/core";
const { SplashScreen, StatusBar } = Plugins;

import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(private platform: Platform, private localNotifications: LocalNotifications) {
    SplashScreen.hide().catch((err) => {
      console.log(err)
    });

    StatusBar.hide().catch((err) => {
      console.warn(err);
    });

    if (this.platform.is('cordova')) {
      this.localNotifications.isScheduled(1).then((scheduled) => {
        if (!scheduled) {
          let firstNotificationTime = new Date();

          firstNotificationTime.setHours(firstNotificationTime.getHours() + 24);

          this.localNotifications.schedule({
            id: 1,
            title: 'Snapaday',
            text: 'Have you taken your snap for today ?',
            trigger: {
              at: firstNotificationTime,
              every: ELocalNotificationTriggerUnit.DAY
            }
          });
        }
      });
    }
  }

}