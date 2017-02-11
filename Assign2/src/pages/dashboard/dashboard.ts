import {Component, NgZone} from '@angular/core';

import {NavController, ModalController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {DataService} from "../../providers/data-service";

@Component({
  selector: 'page-home',
  templateUrl: 'dashboard.html'
})
export class HomePage {

  name: string = "";

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private _data: DataService, private zone: NgZone) {

  }

  ionViewDidLoad(){
    let loginModal = this.modalCtrl.create(LoginPage, {}, {showBackdrop: false, enableBackdropDismiss: false});

    loginModal.onDidDismiss(data => {
      console.log(data);
      this._data.db.ref('/users/' + this._data.uid).on('value', snap => {
        this.zone.run(() => {
          this.name = snap.val().name;
        })
      })

    });

    loginModal.present();
  }

}
