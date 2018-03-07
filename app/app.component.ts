import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from "firebase";
import { TabsPage } from '../pages/tabs/tabs';
import {LogpagePage} from "../pages/logpage/logpage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage=TabsPage;
  email1:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.


     //  if()
      var user = firebase.auth().currentUser;
      if (user != null) {
        var name = user.displayName;
        this.email1 = user.email;
        var photoUrl = user.photoURL;
      }



      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
