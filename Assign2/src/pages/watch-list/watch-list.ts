///<reference path="../../../typings/globals/jquery/index.d.ts"/>
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DataService} from "../../providers/data-service";
import {BookInfoPage} from "../book-info/book-info";

/*
  Generated class for the WatchList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-watch-list',
  templateUrl: 'watch-list.html'
})
export class WatchListPage {

  watchList: any;
  keys: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataService) {}

  private viewWatchedBookInfo(selectedBook: any){
    this.navCtrl.push(BookInfoPage, {book: {volumeInfo: selectedBook}, mode: "watch"});
  }

  ionViewWillEnter(){
    this._data.db.ref('/users/' + this._data.uid + "/watchedBooks").on('value', (snap) => {
      console.log(snap.val());
      this.watchList = snap.val();
      this.keys = Object.keys(snap.val());
      console.log(this.keys);
    })
  }

}
