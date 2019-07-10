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

  }

  takePhoto() {

  }

  playSlideShow(): void {

  }
}
