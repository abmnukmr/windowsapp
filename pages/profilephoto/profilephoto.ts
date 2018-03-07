import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  NavController, NavParams, ViewController, Platform, ActionSheetController,
  ToastController, LoadingController, Loading
} from 'ionic-angular';
import * as firebase from "firebase/app";
import {WalletPage} from "../wallet/wallet";


/*
 Generated class for the Additem page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

declare var cordova: any;
declare var cordova: any;
@Component({
  selector: 'page-profilephoto',
  templateUrl: 'profilephoto.html'
})
export class ProfilephotoPage {
  lastImage=[] ;
  spinshow:boolean=true;
  loading: Loading;
  forupload:any;
  show:boolean=true;
  itemprice:any;
  butn:boolean=false;
  itemnumber:any;
  discription:any;
  base64Image;
  email1:string;
  itemname:any;
  images = [];
  imgin;
  targetimages=[];
//  private cropper:cropperjs.Cropper;

  @ViewChild('imageSrc') input: ElementRef;


  constructor(public navCtrl: NavController, public victrl:ViewController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {

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
