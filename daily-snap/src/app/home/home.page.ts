import { Component } from '@angular/core';
import { SimpleAlertService } from '../services/simple-alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private simpleAlert: SimpleAlertService) { }

}
