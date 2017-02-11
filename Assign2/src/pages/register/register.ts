import {Component, DoCheck} from "@angular/core";
import {NavController, NavParams, ViewController, AlertController} from "ionic-angular";
import {DataService} from "../../providers/data-service";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage implements DoCheck {
  registerError: boolean;
  unMatchedPasswords: boolean;
  newCredentials: any;
  errorMessage: string;

  ngDoCheck(): void {
    this.unMatchedPasswords = (this.newCredentials.password !== this.newCredentials.confirmPassword)
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataService, private viewCtrl: ViewController, private alertCtrl: AlertController) {
    this.registerError = false;
    this.newCredentials = {}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    this._data.auth.createUserWithEmailAndPassword(this.newCredentials.email, this.newCredentials.confirmPassword)
      .then((info) => {
        console.log("Registered:", info);
        this.createNewUserEntry(info.uid);
        this.dismiss(info.uid);
        this.showRegisteredMessage();
        this._data.uid = info.uid;
      }, (error) => {
        // Handle Errors here.
        this.errorMessage = error.message;
        console.log("ERR:", this.errorMessage);
        this.registerError = true;
        // ...
      });
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  private showRegisteredMessage() {
    let alert = this.alertCtrl.create({
      title: 'Successfully Registered!',
      subTitle: 'You have successfully been registered and logged in!',
      buttons: ['Awesome!']
    });
    alert.present();
  }

  private createNewUserEntry(uid: string) {
    this._data.db.ref('users/' + uid).set({
      watchedBooks: ["Test"],
      readBooks: ["Test"],
      name: this.newCredentials.name
    });
  }
}
