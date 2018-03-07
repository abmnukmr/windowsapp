import {Component, NgZone} from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {WalletPage} from "../wallet/wallet";
import {ChatlistPage} from "../chatlist/chatlist";
import {Http} from "@angular/http";
import {FavouriteProvider} from "../../providers/favourite/favourite";
import * as firebase from "firebase";
import {LogpagePage} from "../logpage/logpage";
import {NavController} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  messageCount:any;

  tab1Root = ChatlistPage;
  tab2Root = HomePage;
  tab3Root = ContactPage;

  db:any;
  notification:any=[];
  email1:any;
  dbb:any;
  wendort:any;
  llastmessge:any;
  len:any;
  lrip:any;
  token:any;
  tabBarElement:any;

  constructor(public http:Http,public zone:NgZone,public _favrouite:FavouriteProvider,public navCtrl:NavController) {
    this.tabBarElement = document.querySelector('#tabs ion-tabbar-section');
    var user = firebase.auth().currentUser;


    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        // this.rootPage =TabsPage;


      }
      else {

        this.navCtrl.setRoot(LogpagePage)
        // navCtrl.setRoot(AuthPage);
        //this.presentToast("Please verify your account by sent verfication link to your email");

      }




    });

    if (user != null) {
      this.email1 = user.email;

    }





    this.badge();
  }
  onPageDidEnter()
  {

    this.tabBarElement.style.display = 'block';

  }

  badge(){
    this.zone.run(()=> {

      setInterval(()=>{


        var user = firebase.auth().currentUser;
        if (user != null) {
          var name = user.displayName;
          this.email1 = user.email;
          var photoUrl = user.photoURL;
        }

       // console.log("last message read ");
        this._favrouite.load(this.email1).then((data) => {
          console.log(JSON.stringify(data) + "shop data");
          this.wendort = data
          console.log(this.wendort);
          this.lrip = this.wendort.lastmessage;
          this.llastmessge = this.lrip[0];
          console.log(this.lrip);
          console.log(this.llastmessge);
          for(let i=0; i<this.lrip.length;i++)
          {
            if(this.notification.indexOf(this.lrip[i].tid)==-1) {
              this.notification.push(this.lrip[i].tid)
              this.triggernotification(this.lrip[i])
            }
          }

          if (this.llastmessge != "" ||this.llastmessge !=  null) {

            this.messageCount = this.lrip.length;

            //this.loadi()
          }

          else {

            this.messageCount = null;
          }


        });

      },900)

    });

  }


  uniqurArray(array){
    var a = array.concat();
    for(var i=0; i<a.length; i++) {
      for(var j=i+1; j<a.length; j++) {
        if(a[i].tid === a[j].tid){
          a.splice(j--, 1);
        }
      }
    }

    return a;
  }


  triggernotification(msg){
    //LocalNotifications.schedule({
    //id: 1,
    //text: msg.message,
    //title:msg.user_sender,
    //icon: 'assets/image/notification.png',
    //data: { mydata: 'My hidden message this is' },
    //});

    var options = {
      id: 1,
      text: msg.message,
      title:msg.user_sender,
      //icon: 'assets/image/notification.png',
      body: msg.message,
     // icon: 'assets/image/logo.png',
      // duration: 5000,
      requireInteraction: true,


    }
    var n = new Notification(msg.user_sender,options);
    //setTimeout(n.close.bind(n), 5000);


  }



}
