import { Component, OnInit } from '@angular/core';
import { SimpleAlertService } from '../services/simple-alert.service';
import { PhotoService } from '../services/photo.service';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public photoService: PhotoService,
    private alertCtrl: AlertController,
    private simpleAlert: SimpleAlertService,
    private ModalCtrl: ModalController,
    private socialSharing: SocialSharing,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.photoService.load();
  }

  takePhoto(): void {
    this.loadingCtrl.create({ content: 'Saving Photo...' }).then((overlay) => {
      overlay.present();

      this.photoService.takePhoto()
        .then((photo) => {
          overlay.dismiss();

          this.alertCtrl.create({
            header: 'Nice one!',
            message: 'You\'ve take your photo for today, would you also like to share it ?',
            buttons: [
              {
                text: "No, Thanks"
              },
              {
                text: "share",
                handler: () => {
                  console.log(photo);
                  this.socialSharing.share('i\'m take a selfie every day with #Snapaday', null, photo, null)
                }
              }
            ]
          }).then((prompt) => {
            prompt.present();
          });
        }, (err) => {
          overlay.dismiss();
          this.simpleAlert.createAlert('Oops!', err).then((alert) =>
          {
            alert.present();
          });
        });
    });
  }

  playSlideShow(): void {

  }
}
