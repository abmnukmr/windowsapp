import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  NavController, NavParams, ViewController, Platform, ActionSheetController,
  ToastController, LoadingController, Loading
} from 'ionic-angular';

import * as firebase from "firebase/app";
import {WalletPage} from "../wallet/wallet";
/*
  Generated class for the Onemore page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


@Component({
  selector: 'page-onemore',
  templateUrl: 'onemore.html'
})
export class OnemorePage {
  lastImage=[];
  loading: Loading;
  forupload:any;
  itemprice:any;
  spinshow:boolean=true;
  itemnumber:any;
  discription:any;
  base64Image;
  show:boolean=true;
  butn:boolean=false;
  email1:string;
  itemname:any;
  images = [];
  imgin;
  targetimages=[];
  id:string;
//  private cropper:cropperjs.Cropper;

  @ViewChild('imageSrc') input: ElementRef;


  constructor(public navCtrl: NavController, public navprms: NavParams, public victrl:ViewController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {

    this.id = this.navprms.get("_id");
    this.loading = this.loadingCtrl.create({
      content:"Uploading..."
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdditemPage');
  }


  Dismiss4() {
    this.victrl.dismiss();

  }





}
