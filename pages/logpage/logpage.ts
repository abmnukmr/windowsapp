import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {WalletPage} from "../wallet/wallet";
import {TabsPage} from "../tabs/tabs";
import * as firebase from "firebase";
/**
 * Generated class for the LogpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-logpage',
  templateUrl: 'logpage.html',
})
export class LogpagePage {

  loading:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingg:LoadingController) {

    this.loading = this.loadingg.create({
      content:"Wait..."
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogpagePage');
  }

  goto(){
    this.navCtrl.setRoot(TabsPage);
  }


  login(email,password){

    this.loading.present();
    firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
      this.navCtrl.setRoot(TabsPage);
      this.loading.dismiss();
    }).catch((error)=> {
      // Handle Errors here.
      alert(error)

      this.loading.dismiss();
      // ...
    });
  }
}
