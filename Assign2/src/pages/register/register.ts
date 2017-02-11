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
      watchedBooks: {
        "sample": {
          "title": "The Cabinet of Curiosities",
          "subtitle": "A Novel",
          "authors": [
            "Douglas Preston",
            "Lincoln Child"
          ],
          "publisher": "Grand Central Publishing",
          "publishedDate": "2002-07-01",
          "description": "In an ancient tunnel underneath New York City a charnel house is discovered. Inside are thirty-six bodies--all murdered and mutilated more than a century ago. While FBI agent Pendergast investigates the old crimes, identical killings start to terrorize the city. The nightmare has begun. Again.",
          "industryIdentifiers": [
            {
              "type": "ISBN_10",
              "identifier": "0759527717"
            },
            {
              "type": "ISBN_13",
              "identifier": "9780759527713"
            }
          ],
          "readingModes": {
            "text": true,
            "image": false
          },
          "pageCount": 480,
          "printType": "BOOK",
          "categories": [
            "Fiction"
          ],
          "averageRating": 4.5,
          "ratingsCount": 14,
          "maturityRating": "NOT_MATURE",
          "allowAnonLogging": true,
          "contentVersion": "1.9.11.0.preview.2",
          "imageLinks": {
            "smallThumbnail": "http://books.google.com/books/content?id=Q27C-G2tlbcC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            "thumbnail": "http://books.google.com/books/content?id=Q27C-G2tlbcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          },
          "language": "en",
          "previewLink": "http://books.google.ca/books?id=Q27C-G2tlbcC&printsec=frontcover&dq=intitle:cabinet+of+curiosities&hl=&cd=4&source=gbs_api",
          "infoLink": "https://play.google.com/store/books/details?id=Q27C-G2tlbcC&source=gbs_api",
          "canonicalVolumeLink": "https://market.android.com/details?id=book-Q27C-G2tlbcC"
        }
      },
      readBooks: {
        "sample": {
          "title": "The Cabinet of Curiosities",
          "subtitle": "A Novel",
          "authors": [
            "Douglas Preston",
            "Lincoln Child"
          ],
          "publisher": "Grand Central Publishing",
          "publishedDate": "2002-07-01",
          "description": "In an ancient tunnel underneath New York City a charnel house is discovered. Inside are thirty-six bodies--all murdered and mutilated more than a century ago. While FBI agent Pendergast investigates the old crimes, identical killings start to terrorize the city. The nightmare has begun. Again.",
          "industryIdentifiers": [
            {
              "type": "ISBN_10",
              "identifier": "0759527717"
            },
            {
              "type": "ISBN_13",
              "identifier": "9780759527713"
            }
          ],
          "readingModes": {
            "text": true,
            "image": false
          },
          "pageCount": 480,
          "printType": "BOOK",
          "categories": [
            "Fiction"
          ],
          "averageRating": 4.5,
          "ratingsCount": 14,
          "maturityRating": "NOT_MATURE",
          "allowAnonLogging": true,
          "contentVersion": "1.9.11.0.preview.2",
          "imageLinks": {
            "smallThumbnail": "http://books.google.com/books/content?id=Q27C-G2tlbcC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            "thumbnail": "http://books.google.com/books/content?id=Q27C-G2tlbcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          },
          "language": "en",
          "previewLink": "http://books.google.ca/books?id=Q27C-G2tlbcC&printsec=frontcover&dq=intitle:cabinet+of+curiosities&hl=&cd=4&source=gbs_api",
          "infoLink": "https://play.google.com/store/books/details?id=Q27C-G2tlbcC&source=gbs_api",
          "canonicalVolumeLink": "https://market.android.com/details?id=book-Q27C-G2tlbcC"
        }
      },
      name: this.newCredentials.name
    });
  }
}
