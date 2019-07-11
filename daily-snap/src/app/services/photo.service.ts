import { Injectable } from '@angular/core';

import { DataService } from "./data.service";
import { Platform } from "@ionic/angular";
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, Filesystem, CameraOptions } from "@capacitor/core"

const { Camera, FileSystem } = Plugins;

@Injectable({
  providedIn: 'root'
})



export class PhotoService {

  public photos: Photo[] = [];
  public loaded: boolean = false;

  public photoTaken: boolean = false;

  constructor(private dataService: DataService, private platform: Platform) { }

  load(): void {
    //  test data
    // this.photos = [
    //   {
    //     name: 'test', path: 'https://placehold.it/100x100',
    //     dateTaken: new Date(2018, 5, 5)
    //   },
    //   {
    //     name: 'test', path: 'https://placehold.it/100x100',
    //     dateTaken: new Date(2018, 5, 6)
    //   },
    //   {
    //     name: 'test', path: 'https://placehold.it/100x100',
    //     dateTaken: new Date(2018, 5, 8)
    //   },
    //   {
    //     name: 'test', path: 'https://placehold.it/100x100',
    //     dateTaken: new Date(2018, 5, 10)
    //   }
    // ]
    // 

    this.platform.resume.subscribe(() => {
      if (this.photos.length > 0) {
        let today = new Date();
        if (this.photos[0].dateTaken.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
          this.photoTaken = true;
        } else {
          this.photoTaken = false;
        }
      }
    });

    this.dataService.getData().then((photos) => {
      console.log(photos);

      if (photos != null) {
        this.photos = photos;
      }

      if (this.photos.length > 0) {
        let today = new Date();

        if (this.photos[0].dateTaken.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
          this.photoTaken = true;
          this.photoTaken = false; //testing: allow taking more than 1 photo per day
        }
      }

      this.loaded = true;
    })
  }

  takePhoto(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.loaded || this.photoTaken) {
        reject('Not allowed to take photo');
      }
      let options: CameraOptions = {
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      };
      Camera.getPhoto(options).then(
        (photo) => {
          Filesystem.readFile({
            path: photo.path
          })
            .then((result) => {
              let date = new Date(),
                time = date.getTime(),
                fileName = time + '.jpeg';
              Filesystem.writeFile({
                data: result.data,
                path: fileName,
                directory: FilesystemDirectory.Data
              })
                .then((result) => {
                  Filesystem.getUri({
                    directory: FilesystemDirectory.Data,
                    path: fileName
                  })
                    .then((result) => {
                      console.log(result);
                      this.createPhoto(fileName,
                        result.uri.replace('file://', '_capacitor_'));
                      resolve(result.uri);
                    }, (err) => {
                      console.log(err);
                      reject('Could not find photo in storage');
                    });
                }, (err) => {
                  console.log(err);
                  reject('Could not write photo to storage');
                });
            }, (err) => {
              console.log(err);
              reject('Could not read photo data');
            });
        }, (err) => {
          console.log(err);
          reject('Could not take photo');
        }
      );
    });
  }

  createPhoto(name, path): void {
    this.photos.unshift({
      name: name,
      path: path,
      dateTaken: new Date()
    });

    this.save();
  }

  deletePhoto(photo): void {
    let index = this.photos.indexOf(photo);

    if (index > -1) {
      this.photos.splice(index, 1);
      this.save();
    }

    // if deleted photo was taken today, allow user to take new photo;
    let today = new Date();

    if (photo.dateTaken.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
      this.photoTaken = false;
    }

    // remove from filesystem

    FileSystem.deleteFile({
      path: photo.name,
      directory: FilesystemDirectory.Data
    })
      .then((result) => {
        console.log(result)
      }, (err) => {
        console.log(err);
      });

  }

  save(): void {
    this.dataService.save(this.photos);
  }
}


interface Photo {
  name: string,
  path: string,
  dateTaken: Date
}