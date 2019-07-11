import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { ModalController } from "@ionic/angular";
import { PhotoService } from "../services/photo.service";

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.page.html',
  styleUrls: ['./slideshow.page.scss'],
})
export class SlideshowPage implements OnInit {

  @ViewChild('imagePlayer') imagePlayer: ElementRef;

  private imagePlayerInterval: any;

  constructor(private photoService: PhotoService, private ModlalCtrl: ModalController) { }

  ngOnInit() {
    this.playPhotos();
  }

  playPhotos(): void {
    let imagePlayer = this.imagePlayer.nativeElement;
    let i = 0;

    // clear any interval

    clearInterval(this.imagePlayerInterval);

    // Restart

    this.imagePlayerInterval = setInterval(() => {
      if (i < this.photoService.photos.length) {
        imagePlayer.src = this.photoService.photos[i].path;
        i++;
      }else{
        clearInterval(this.imagePlayerInterval);
      }
    }, 500);
  }

  close():void{
    this.ModlalCtrl.dismiss();
  }

}
