import { Component } from '@angular/core';

import {NavController, ModalController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'dashboard.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {

  }

  ionViewDidLoad(){

  }

}
