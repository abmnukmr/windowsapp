import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, ViewController} from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import * as firebase from "firebase/app";
import {WalletPage} from "../wallet/wallet";
import {FormBuilder, FormControl} from "@angular/forms";

/*
  Generated class for the Edititem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edititem',
  templateUrl: 'edititem.html'
})
export class EdititemPage {

  itemname:any;
  itemnumber:number;
  itemprice:any;
  id:any;
  email1:any;
  update:any;
  loading:any;
  discription:any;

  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    placeholder: "insert content..."
  };

 trigger:boolean=false;
  item: FormControl;




  constructor(private formBuilder: FormBuilder,public victrl:ViewController,public navCtrl: NavController, public navprms: NavParams,public http:Http,public loadingCtrl:LoadingController) {


    this.itemname = this.navprms.get("item_name");
    this.itemnumber = this.navprms.get("item_no");
    this.discription = this.navprms.get("item_discription");
    this.itemprice = this.navprms.get("item_price");
   // this.itemprice=this.navprms.get("_id");

    this.id = this.navprms.get("_id");


    this.loading = this.loadingCtrl.create({
      content:"Saving..."
    });

  }


  ionViewDidLoad() {

    console.log('ionViewDidLoad AdditemPage');
  }

  ionViewWillLoad() {
    this.item = this.formBuilder.control('');
    this.discription = this.navprms.get("item_discription");
    this.item.setValue(this.discription);


  }





  updatedata() {
    this.loading.present();
    var user = firebase.auth().currentUser;
    if (user != null) {
      var name = user.displayName;
      this.email1 = user.email;
      var photoUrl = user.photoURL;
    }

    this.update = {
      item_name: this.itemname,
      item_number: this.itemnumber,
      item_discription: this.discription,
      item_price: this.itemprice,
      item_id: this.id,
      trigger:this.trigger
    }
    console.log("updated start");
    var headers = new Headers();
    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers: headers});

    this.http.post('https://vaiotibackend.herokuapp.com/profile/email/update/item/' + this.email1, JSON.stringify(this.update), options)
        .subscribe(data => {
        console.log(data)
        this.loading.dismissAll();
        this.Dismiss();
        //this.navCtrl.push(WalletPage);
      }, err => {
        console.log("Error!:", err.json());
       this.loading.dismissAll();
      });

      this.loading.dismissAll();
      this.Dismiss();

  }


  Dismiss(){
    this.victrl.dismiss();

  }
}
