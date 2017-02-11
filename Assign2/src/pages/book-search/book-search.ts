import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";

/*
  Generated class for the BookSearch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

// GET Request sample Code
// GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey

@Component({
  selector: 'page-book-search',
  templateUrl: 'book-search.html'
})
export class BookSearchPage {

  apiKey: string = 'key=AIzaSyBAEXgsrea7j7MMEJzXKxIysjvK7OTXthc';
  queryString: string = 'https://www.googleapis.com/books/v1/volumes?q=';

  titlePrefix: string = "intitle:";
  authorPrefix: string = "inauthor:";
  publisherPrefix: string = "inpublisher:";
  subjectPrefix: string = "subject:";
  isbnPrefix: string = "isbn:";
  lccnPrefix: string = "lccn:";
  oclcPrefix: string = "oclc:";

  title: string = "";
  author: string = "";
  publisher: string = "";
  subject: string = "";
  isbn: string = "";
  lccn: string = "";
  oclc: string = "";

  c_title: string = "";
  c_author: string = "";
  c_publisher: string = "";
  c_subject: string = "";
  c_isbn: string = "";
  c_lccn: string = "";
  c_oclc: string = "";

  cQuery: string;
  nospaceQuery: string;

  results: JSON;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookSearchPage');
  }

  searchForBook(){
    // Generate Search Query
    this.title === "" ? null : this.c_title = this.titlePrefix + this.title + "&";
    this.author === "" ? null : this.c_author = this.authorPrefix + this.author + "&";
    this.publisher === "" ? null : this.c_publisher = this.publisherPrefix + this.publisher + "&";
    this.subject === "" ? null : this.c_subject = this.subjectPrefix + this.subject + "&";
    this.isbn === "" ? null : this.c_isbn = this.isbnPrefix + this.isbn + "&";
    this.lccn === "" ? null : this.c_lccn = this.lccnPrefix + this.lccn + "&";
    this.oclc === "" ? null : this.c_oclc = this.oclcPrefix + this.oclc + "&";

    this.cQuery = this.queryString
    + this.c_title
    + this.c_author
    + this.c_publisher
    + this.c_subject
    + this.c_isbn
    + this.lccn
    + this.oclc
    + this.apiKey;

    this.nospaceQuery = this.cQuery.split(' ').join('+');
    console.log("QUERY STRING:", this.nospaceQuery);

    this.http.get(this.nospaceQuery)
      .map(res => res.json())
      .subscribe(
        reply => {
          this.results = reply;
          console.log("GOT:", this.results);
          //TODO: List results in separate page
        },
        error => console.warn("ERROR:", error)
      )
  }

}
