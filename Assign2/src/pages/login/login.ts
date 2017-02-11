import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {DataService} from "../../providers/data-service";
import {RegisterPage} from "../register/register";

// Some elements of this page (largely aesthtetic elements) were borrowed from
// https://devdactic.com/login-ionic-2/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  registerCredentials: any;
  loginError: boolean;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataService, private viewCtrl: ViewController, private modalCtrl: ModalController) {
    this.registerCredentials = {};
    this.loginError = false;
  }

  createAccount(){
    console.log("Create account");
    let registerModal = this.modalCtrl.create(RegisterPage);

    registerModal.onDidDismiss((data)=>{
      console.log(data);
      if (data !== null) {
        this.dismiss(data);
      }
    });

    registerModal.present();
  }

  login(){
    this._data.auth.signInWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password).then((info) => {
      console.log("LOGGED IN!");
      this.dismiss(info.uid);
      this._data.uid = info.uid;
    }, (error) => {
        // Handle Errors here.
        this.errorMessage = error.message;
        console.error("ERR:", this.errorMessage);
        this.loginError = true;
        // ...
      });
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
