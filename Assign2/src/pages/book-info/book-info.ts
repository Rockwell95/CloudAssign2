import {Component} from "@angular/core";
import {NavController, NavParams, AlertController} from "ionic-angular";
import {DataService} from "../../providers/data-service";

/*
 Generated class for the BookInfo page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-book-info',
  templateUrl: 'book-info.html'
})
export class BookInfoPage {

  bookObj: any;
  mode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataService, private alertCtrl: AlertController) {
    this.bookObj = this.navParams.get('book').volumeInfo;
    this.mode = this.navParams.get('mode');
    console.log(this.bookObj);
    console.log("MODE:", this.mode);
  }

  bookmark() {
    this._data.db.ref('/users/' + this._data.uid + "/readBooks").push(this.bookObj);
    let alert = this.alertCtrl.create({
      title: 'Added to Watch List',
      subTitle: 'You have successfully added <em>' + this.bookObj.title + '</em> to your Already Read list!',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.pop();
  }

  moveFromWatched(moveToRead: boolean) {
    let keys;
    let key;
    this._data.db.ref('/users/' + this._data.uid + "/watchedBooks").once('value', (snap) => {
      keys = Object.keys(snap.val());
      for (let thiskey of keys) {
        if (snap.val()[thiskey].title === this.bookObj.title) {
          key = thiskey;
          console.log("KEY:", key);
          break;
        }
      }
      this._data.db.ref('/users/' + this._data.uid + "/watchedBooks").child(key).remove().then(() => {
        console.log('Deleted');
        if (moveToRead) {
          // console.log(this.bookObj);
          this._data.db.ref('/users/' + this._data.uid + "/readBooks").push(this.bookObj);
        }
      }).catch((error) => {
        console.warn("Removal failed:", error.message)
      });
    });
    this.navCtrl.pop();
  }

  watch() {
    this._data.db.ref('/users/' + this._data.uid + "/watchedBooks").push(this.bookObj);
    let alert = this.alertCtrl.create({
      title: 'Added to Watch List',
      subTitle: 'You have successfully added <em>' + this.bookObj.title + '</em> to your watch list!',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.pop();
  }

  removeFromWatched() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete "' + this.bookObj.title + '" from your watch list? This cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Delete Cancelled');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Deleting...');
            this.moveFromWatched(false);
            this.navCtrl.pop();
          }
        }
      ]
    });

    confirm.present();
  }

  removeFromRead() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete "' + this.bookObj.title + '" from your Already Read list? This cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Delete Cancelled');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            let keys;
            let key;
            console.log('Deleting...');
            this._data.db.ref('/users/' + this._data.uid + "/readBooks").on('value', (snap) => {
              if (snap.val()) {
                keys = Object.keys(snap.val());
                for (let thiskey of keys) {
                  if (snap.val()[thiskey].title === this.bookObj.title) {
                    key = thiskey;
                    break;
                  }
                }
                this._data.db.ref('/users/' + this._data.uid + "/readBooks").child(key).remove().then(() => {
                  console.log('Deleted');
                }).catch((error) => {
                  console.warn("Removal failed:", error.message)
                });
              }
            });
            this.navCtrl.pop();
          }
        }
      ]
    });

    confirm.present()
  }

}
