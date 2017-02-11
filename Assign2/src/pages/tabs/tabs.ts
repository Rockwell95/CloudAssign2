import {Component, DoCheck} from "@angular/core";
import {HomePage} from "../dashboard/dashboard";
import {AboutPage} from "../about/about";
import {ContactPage} from "../contact/contact";
import {WatchListPage} from "../watch-list/watch-list";
import {BookSearchPage} from "../book-search/book-search";
import {DataService} from "../../providers/data-service";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage{

  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = WatchListPage;
  tab3Root: any = BookSearchPage;
  tab4Root: any = AboutPage;
  tab5Root: any = ContactPage;

  watchListEmpty: boolean = false;

  constructor() {}


}
