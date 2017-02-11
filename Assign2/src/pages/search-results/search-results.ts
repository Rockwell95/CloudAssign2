import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BookInfoPage} from "../book-info/book-info";

/*
  Generated class for the SearchResults page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html'
})
export class SearchResultsPage {

  searchResults: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.searchResults = this.navParams.get('items');
  }

  private viewBookInfo(selectedBook: any){
    this.navCtrl.push(BookInfoPage, {book: selectedBook, mode: "search"});
  }

}
