import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/dashboard/dashboard';
import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {DataService} from "../providers/data-service";
import {WatchListPage} from "../pages/watch-list/watch-list";
import {BookSearchPage} from "../pages/book-search/book-search";
import {SearchResultsPage} from "../pages/search-results/search-results";
import {BookInfoPage} from "../pages/book-info/book-info";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    WatchListPage,
    BookSearchPage,
    SearchResultsPage,
    BookInfoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    WatchListPage,
    BookSearchPage,
    SearchResultsPage,
    BookInfoPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService]
})
export class AppModule {}
