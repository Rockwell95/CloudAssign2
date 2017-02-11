import {Component, NgZone} from '@angular/core';

import {NavController, ModalController, AlertController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {DataService} from "../../providers/data-service";
import {BookInfoPage} from "../book-info/book-info";

@Component({
  selector: 'page-home',
  templateUrl: 'dashboard.html'
})
export class HomePage {

  name: string = "";
  readList: any;
  keys: Array<string>;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private _data: DataService, private zone: NgZone, private alertCtrl: AlertController) {

  }

  ionViewDidLoad(){
    let loginModal = this.modalCtrl.create(LoginPage, {}, {showBackdrop: false, enableBackdropDismiss: false});

    loginModal.onDidDismiss(data => {
      console.log(data);
      this._data.db.ref('/users/' + this._data.uid).on('value', snap => {
        this.zone.run(() => {
          this.name = snap.val().name;
          this.initializeList()
        })
      })

    });
    loginModal.present();
  }

  private viewReadBookInfo(selectedBook: any){
    this.navCtrl.push(BookInfoPage, {book: {volumeInfo: selectedBook}, mode: "read"});
  }

  initializeList(){
    this._data.db.ref('/users/' + this._data.uid + "/readBooks").on('value', (snap) => {
      console.log(snap.val());
      this.readList = snap.val();
      this.keys = Object.keys(snap.val());
      console.log(this.keys);
    });
  }

  logout(){
    let confirm = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Logout Cancelled');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            location.reload();
          }
        }
      ]
    });

    confirm.present()
  }

}
