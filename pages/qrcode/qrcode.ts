import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import * as firebase from "firebase/app";
//import {QRCodeComponent} from 'angular2-qrcode';

import { Base64 } from 'js-base64';
/*
  Generated class for the Qrcode page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
 // directives:[QRCodeComponent]

})

export class QrcodePage {
 // declare var jsscompress : any;

  tryu:string=" ";
  shopname:string;
  email1:string;
  qrdata1:any;
  qrdata:any;
  Encrypted:any;
  shopimage:string;
  shopcata:string;
  urln:any;
  durln:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public victrl:ViewController) {


    this.shopname=this.navParams.get("shopname");
    //shopname:this.wendor.name,shopimage:this.wendor.profileimage,shopcata:this.wendor.catagory
    this.shopimage=this.navParams.get("shopimage");
    this.shopcata=this.navParams.get("shopcata");




    var user = firebase.auth().currentUser;
    if (user != null) {
      var  name = user.displayName;
      this.email1 = user.email;
      var  photoUrl = user.photoURL;
    }
    this.urln=Base64.encode(this.email1)
     this.durln=Base64.decode(this.urln)

    this.qrdata={
      shopemail:this.email1,
      shopname:this.shopname,
      shopimage:this.shopimage,
      shopcata:this.shopcata,
      tableNo:""
    }

    var compressed = Base64.encode(JSON.stringify(this.qrdata));
    this.qrdata1=Math.random().toString(36).substr(2, 6)+compressed;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

  Dismiss(){
    this.victrl.dismiss();

  }





}
