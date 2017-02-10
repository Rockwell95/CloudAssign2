import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import firebase from "firebase";

/*
 Generated class for the DataService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class DataService {

  public db: any;
  public placesOfInterest: any;

  constructor() {
  }

  init() {

    const firebaseConfig = {
      apiKey: "AIzaSyCYkwWAsjidn_9o4lpPlbXcgCYoMg7hn5I",
      authDomain: "cloudassign2-6518b.firebaseapp.com",
      databaseURL: "https://cloudassign2-6518b.firebaseio.com",
      storageBucket: "cloudassign2-6518b.appspot.com",
      messagingSenderId: "582755336621"
    };

    firebase.initializeApp(firebaseConfig);

    // firebase.auth().signInWithEmailAndPassword("dominick.mancini@uoit.net", "test123").catch((error) => {
    //   // Handle Errors here.
    //   let errorMessage = error.message;
    //   console.error("ERR:", errorMessage);
    //   // ...
    // });

    this.db = firebase.database();

    this.db.ref('places').on('value', (data) => {
      console.log(data.val());
    }, (error) => {
      console.warn(error);
    })
  }

}
