import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import {SearchResultsPage} from "../search-results/search-results";

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

  apiKey: string = '&key=AIzaSyBAEXgsrea7j7MMEJzXKxIysjvK7OTXthc';
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

  c_title: string;
  c_author: string;
  c_publisher: string;
  c_subject: string;
  c_isbn: string;
  c_lccn: string;
  c_oclc: string;

  cQuery: string;
  nospaceQuery: string;

  results: JSON;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {

  }

  searchForBook(){
    // Generate Search Query
    this.title === "" ? this.c_title = "" : this.c_title = this.titlePrefix + this.title;
    this.author === "" ? this.c_author = "" : this.c_author =  "+" + this.authorPrefix + this.author;
    this.publisher === "" ? this.c_publisher = "" : this.c_publisher = "+" + this.publisherPrefix + this.publisher;
    this.subject === "" ? this.c_subject = "" : this.c_subject = "+" + this.subjectPrefix + this.subject;
    this.isbn === "" ? this.c_isbn = "" : this.c_isbn = "+" + this.isbnPrefix + this.isbn;
    this.lccn === "" ? this.c_lccn = "" : this.c_lccn = "+" + this.lccnPrefix + this.lccn;
    this.oclc === "" ? this.c_oclc = "" : this.c_oclc = "+" + this.oclcPrefix + this.oclc;

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
          this.navCtrl.push(SearchResultsPage, this.results);
          //TODO: List results in separate page
        },
        error => console.warn("ERROR:", error)
      )
  }

}
