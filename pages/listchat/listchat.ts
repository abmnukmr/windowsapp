import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, reorderArray, ViewController} from 'ionic-angular';
import * as firebase from "firebase";

import { Storage } from '@ionic/storage';
import {ChatbotPage} from "../chatbot/chatbot";
/**
 * Generated class for the ListchatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-listchat',
  templateUrl: 'listchat.html',
})
export class ListchatPage {

  email1:any;
  tr:any;
  turoalto:any;
  turo:boolean=true;
  turon:boolean=true;
  items:any[] = [];

 addaltert:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage,public vctrl:ViewController) {

    var user = firebase.auth().currentUser;
    if (user != null) {
      this.email1 = user.email;

    }
    else {
      alert("Not detect any user");
     // this.goback();
    }


    this.storage.get('chattemp'+this.email1).then((val) => {
      if(val==null || val=="" ||val.trim().length==0){
       // this.showCheckbox()

        this.items=JSON.parse(val);
         this.items.push({"temp":"Welcome"})

      }
      else {
        this.items=JSON.parse(val);

       // this.userb=val;
      }


    });


  }

  reorderItems(index){
    this.items=reorderArray(this.items,index)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListchatPage');
  }


  add(tm){
  this.items=this.items|| []
    if(tm.trim().length!=0){
    this.items.push({"temp":tm})
    this.tr = " ";
      this.turon=false;
      this.turo=false;
  // this.saveitem()
    }
  }



  saveitem(){
    this.storage.set('chattemp'+this.email1, JSON.stringify(this.items));
    this.turo=true;

  }

   editiM(){
    this.turo=false;

   }

   pop(){
     this.vctrl.dismiss( );
   }


   deleted(i)
   {
     this.items.splice(i,1)
     this.storage.set('chattemp'+this.email1, JSON.stringify(this.items));
   }


   addalert()
   {
   this.addaltert=false;

   }

}
