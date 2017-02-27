import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import {DataService} from "../providers/data-service";

import * as AWS from 'aws-sdk';
import * as AMA from 'aws-sdk-mobile-analytics'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, data: DataService) {
    data.init();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      //Make sure region is 'us-east-1'
      AWS.config.region = 'us-east-1';
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:a12b7be8-b0bb-4d43-bfef-f35aa0ac7a17' //Amazon Cognito Identity Pool ID
      });

      let options = {
        appId : 'c8181a9878d74edba8daf1c29deefdb3', //Amazon Mobile Analytics App ID
        appTitle : 'CloudAssign2',              //Optional e.g. 'Example App'
        appVersionName : 1.0, //Optional e.g. '1.4.1'
        appVersionCode : 1, //Optional e.g. '42'
        appPackageName : 'com.ionic.cloudassign2'  //Optional e.g. 'com.amazon.example'
      };

      let mobileAnalyticsClient = new AMA.Manager(options);
    });
  }
}
