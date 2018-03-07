import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, LoadingController, Loading} from 'ionic-angular';
import {RequestOptions, Headers, Http} from "@angular/http";
import * as firebase from "firebase/app";
import {WalletPage} from "../wallet/wallet";

/*
  Generated class for the Titlecontact page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-titlecontact',
  templateUrl: 'titlecontact.html'
})
export class TitlecontactPage {

  email1:string;
  update:any;
  wait:boolean=false;
  loading:any;
  phone:any;
  email:string
  whatsapp:string
  constructor(public navCtrl: NavController,public http:Http,public navParams: NavParams,public victrl:ViewController,public loadingCtrl:LoadingController ) {

    this.phone=this.navParams.get("phone");


    this.loading = this.loadingCtrl.create({
      content:"Saving..."
    });


  }


  ionViewDidLoad() {
//    console.log('ionViewDidLoad TitleeditorPage');
  }




  updatedata() {
    console.log("updated start");
    this.loading.present();
    var user = firebase.auth().currentUser;
    if (user != null) {
      var name = user.displayName;
      this.email1 = user.email;
      var photoUrl = user.photoURL;
    }

    this.update = {
      phone: this.phone,
      whatsapp: this.whatsapp,
      //item_discription: this.discription,
      //item_price: this.itemprice,
      //item_id: this.id
    }
    console.log("updated start");
    var headers = new Headers();
    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers: headers});

    this.http.post('https://vaiotibackend.herokuapp.com/profile/email/update/contact/' + this.email1, JSON.stringify(this.update), options)
      .subscribe(data => {
      console.log(data)
      this.wait=true;
      this.loading.dismissAll();
      this.navCtrl.pop();
    }, err => {
      console.log("Error!:", err.json());
      this.loading.dismissAll();
    });

    console.log("dwrwe ooooops");
    setTimeout(() => {
      this.wait=true;
      this.loading.dismissAll();
      this.navCtrl.pop();


      console.log('Async operation has ended');
    }, 8000);



  }



}
