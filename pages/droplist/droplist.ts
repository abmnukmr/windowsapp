import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Http} from "@angular/http";
import * as firebase from "firebase";

/**
 * Generated class for the DroplistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-droplist',
  templateUrl: 'droplist.html',
})
export class DroplistPage {

  price:any=[]
  public counter : number = 1;
  porder:any=[];
  wendor:any;
  data:any;
  email1:any;
  items:any;
  title:any;
  filtter:any;
  iname:any;
  ort:boolean=true;
  constructor(public Vctrl:ViewController, public http:Http,public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController) {
    this.getReviews()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DroplistPage');
  }


add(id:number,i){

  this.ort=false;

  this.price[i].select=Number.parseInt(this.price[i].price.toString())*Number.parseInt(this.price[i].num.toString())
  this.price[i].num =Number.parseInt(this.price[i].num.toString())+1;
  Number.parseInt(this.price[i].num.toString())

   }



 sub(id:number,i){
  var st=Number.parseInt(this.price[i].num.toString())-2;
  // var num = Number.parseInt(this.price[i].price.toString())/st;
  // this.price[i].num=num-1;
   if(st==0){
     this.price[i].select=""
     this.price[i].num="1"



   }else {


     this.price[i].select=Number.parseInt(this.price[i].price.toString())*st

     this.price[i].num =Number.parseInt(this.price[i].num.toString())-1;

   }


  }

  shon(i){
   return Number.parseInt(this.price[i].num.toString())-1
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
              this.price=JSON.parse(this.wendor.quicklist);
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
            this.price=JSON.parse(this.wendor.quicklist);
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




  order(){



    for(let i=0; i< this.price.length;i++){

      if(this.price[i].select !=""){
        var numer =Number.parseInt(this.price[i].num.toString())-1;
        this.porder.push("<b style='color: #cb1b58'>"+ "#"+numer+"-"+"</b>"+this.price[i].name+"<br>")
      }


    }






      let prompt = this.alertCtrl.create({
        title: 'Your order',
        message: this.porder.join(""),
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              this.porder=[];
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Place Order',
            handler: data => {
              this.dismiss4(this.porder.join(""))
            }
          }
        ]
      });
      prompt.present();

  }




  initializeItems(){
    this.items=this.price;
  }


  getItems(ev:any) {

    this.initializeItems();

    //var val = ev.g;

    try{

      var val = ev.target.value;

    }catch(e){
      if(e){
        // If fails, Do something else
      }
    }


    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        this.filtter=this.title;
        console.log(this.filtter);
        return (item.catagory.toLowerCase().indexOf(val.toLowerCase()) > -1);


      })
    }

  }



  dismiss(){
    this.Vctrl.dismiss()
  }

  dismiss4(data){
    this.Vctrl.dismiss(data)
  }


}

