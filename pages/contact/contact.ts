import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import * as firebase from "firebase/app";
import {LogpagePage} from "../logpage/logpage";
import {QuicklistPage} from "../quicklist/quicklist";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,public Mdl:ModalController) {

  }



  logout(){
    firebase.auth().signOut()
    this.navCtrl.setRoot(LogpagePage)
  }

  quicklist(){
    let rt=this.Mdl.create(QuicklistPage)
    rt.present()
   }
}
