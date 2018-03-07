import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams, reorderArray, ViewController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {RequestOptions, Headers, Http} from "@angular/http";
import * as firebase from "firebase";

/**
 * Generated class for the QuicklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-quicklist',
  templateUrl: 'quicklist.html',
})
export class QuicklistPage {

  name:any;
  price:any;
  email1:any;
  update:any;
  items:any=[];
  loading:any;
  data:any;
  wendor:any;
  quick:any;
  constructor(public loadingCtrl:LoadingController,public http:Http,public storage:Storage,public navCtrl: NavController, public navParams: NavParams,public Vctrl:ViewController) {

    this.loading = this.loadingCtrl.create({
      content:"Saving..."
    });

    this.getReviews()

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuicklistPage');
  }

  Dismiss(){
    this.Vctrl.dismiss()
  }

  reorderItems(index){
    this.items=reorderArray(this.items,index)
  }

 add(name,price){
    if(this.name.trim().length !=0 &&this.price.trim().length !=0) {
      this.items.push({"name": name, "price": price,"select":"","num":1})
      this.name = "";
      this.price = "";
    }
 }

  deleted(i){
   this.items.splice(i,1)
  }




  getReviews(){

//    this.loading.present();


    var user = firebase.auth().currentUser;
    if (user != null) {
      var  name = user.displayName;
      this.email1 = user.email;
      var  photoUrl = user.photoURL;
    }

    if (this.data) {
      console.log("g");
      // return Promise.resolve(this.data);
      return new Promise(resolve => {
        this.http.get('https://vaiotibackend.herokuapp.com/profile/'+this.email1 )
          .map(res => res.json())

          .subscribe(data => {
              this.data = data;
              resolve(this.data);
              console.log(data);
              this.wendor = data;
            //  this.showThis = true;
              //this.open = false;
            this.items=JSON.parse(this.wendor.quicklist);
//              this.loading.dismissAll();

              console.log("reloded");

            },
            err => {
             // this.showThis = false;
             // this.open = true;
              console.log("data not matched");
            //  this.loading.dismissAll();

              console.log("Oops!");

            }
          );


      });


    }

    return new Promise(resolve => {


      this.http.get('https://vaiotibackend.herokuapp.com/profile/'+this.email1 )
        .map((res) => res.json())

        .subscribe(data => {
            this.data = data;
            resolve(this.data);
            console.log(data);

            this.wendor = data;
            this.items=JSON.parse(this.wendor.quicklist);
            //this.showThis = true;
           // this.open = false;
           // this.loading.dismissAll();

            //console.log(data);
            console.log("ghdgggg");


          },

          err => {
            //
            //      this.data={"error":"error"};
          //  this.showThis = false;
           // this.open = true;
            console.log("data not matched");
           // this.loading.dismissAll();

            console.log("Oops");

            //  return this.errror=2;


          },
          () => {
            console.log("Done");
//              errror=2;

            //return this.errror=2;

          }
        );


    });

  }





  updatedata() {
    if(this.items.length >0){
    console.log("updated start");
    this.loading.present();
    var user = firebase.auth().currentUser;
    if (user != null) {
      var name = user.displayName;
      this.email1 = user.email;
      var photoUrl = user.photoURL;
    }
    else alert("usernot detected")

    this.update = {
      quicklist: JSON.stringify(this.items)
      //item_discription: this.discription,
      //item_price: this.itemprice,
      //item_id: this.id
    }
    console.log("updated start");
    var headers = new Headers();
    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers: headers});

    this.http.post('https://vaiotibackend.herokuapp.com/profile/email/update/dis/quicklist/' + this.email1, JSON.stringify(this.update), options)
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
    }else {

    }

  }





}
