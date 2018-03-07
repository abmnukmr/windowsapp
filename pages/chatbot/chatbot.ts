import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {AlertController, Content, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import * as io from 'socket.io-client';
import * as moment from 'moment'
import * as firebase from "firebase/app";
import PouchDB from 'pouchdb';
import { Storage } from '@ionic/storage';
import {Http, RequestOptions,Headers} from "@angular/http";
import {ListchatPage} from "../listchat/listchat";

/*
  Generated class for the ChatbotPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chatbot',
  templateUrl: 'chatbot.html'
})
export class ChatbotPage {
  df:boolean=true;
  name:any;
  image:any;
  email2:any;
  socket:any;
  user:any;
  sert:boolean=true;
  showif:boolean=true;
  chats=[];
  db:any;
  dt:any;
  inames:any;
  filtters:any;
  itemss:any;
  testchat:any=[];
  filtter:any;
  kebshow:boolean=false;
  toggled: boolean = false;
  message:any="";
  self_text:boolean=true;
  clint_text:boolean=true;
  self_image:boolean=true;
  clint_image:boolean=true;
  msg:any;
  chatbox:any;
  title:any;
  titles:any;

  count:any=0;
  email1:any;
  sockett:any;
  dchat:any;
  dbb:any;
  strcl:any;
  padAmount:any=40;
  type:any;
  user_name:any="Abhimanyu";
  url:any;
  bigju:boolean=true;
  bigjuu:boolean=true;
  height:any=100;
  chtli:any;
  otp:any="";
  otpn:any;
   tr:string="Welcome"
  @ViewChild(Content)content: Content;
  tempte:any=[];


  constructor(public Mdl:ModalController,public http:Http, public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams,public vctRl:ViewController,public zone:NgZone, public storage:Storage) {
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.email1 = user.email;

    }
    else {
      alert("Not detect any user");
      this.goback();
    }



    if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem("lastname", "Smith");
      // Retrieve
      this.user = localStorage.getItem("lastname");
    }
    else
      {

      document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }












    Notification.requestPermission().then((result)=> {
      console.log(result);
    });


    this.getchatdata();

    //this.getdata();
    /*
        this.ScrollToBottom();
        //console.log(this.url)
        this.socket = io('https://vaiotibackend.herokuapp.com',{reconnection: true,forceNew:true, reconnectionAttempts: Infinity});

        // this.socket = io('http://localhost:3000/');

        this.socket.emit('socketjoined',this.email1)
        //this.socket.emit('socketjoined',this.email2)
        // this.showMessenger()
        this.socket.on('gettomessage', (msg) => {
          if(msg!= null && msg.sender_mail==this.email2||msg.sender_mail==this.email1) {

            console.log("message", msg.email);
            console.log("check");

            this.chats.push(msg);

            this.addata(msg);

            console.log(this.chats);

          }
          else {
            if(msg.email==this.email1) {
              this.setupdb(msg.sender_mail+this.email1);
              this.addata(msg);
              this.triggernotification(msg);

            }


          }




        });


        this.socket.on('typingrec', (msg) => {
          if(msg!= null && msg.email==this.email1 && msg.email1==this.email2) {

            this.type = msg.type;
            console.log(this.type)
          }
        });


      */

  }
  clskbd(opt){
    //this.nat_keyboard.hideMessenger(opt)
  }





  keyExists(key, search) {
    if (!search || (search.constructor !== Array && search.constructor !== Object)) {
      return false;
    }
    for (var i = 0; i < search.length; i++) {
      if (search[i] === key) {
        return true;
      }
    }
    return key in search;
  }


  showCheckbox() {
    let prompt = this.alertCtrl.create({
      title: 'Add your  Name',
      message: "Set your Store Name if you have store on VAIOTI",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
        }


      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.storage.set('name'+this.email1, data.name);

            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
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
      title:"VAIOTI",
      //icon: 'assets/image/notification.png',
      body: msg.message,
      icon: 'assets/image/logo.png'
    }
    var n = new Notification(msg.user_sender,options);
    setTimeout(n.close.bind(n), 5000);
  }
 rehide(){
    this.sert=true;
    this.inames=""
 }

  hidese(){
    this.sert=false;
  }

  ionViewDidEnter(){

    var user = firebase.auth().currentUser;
    if (user != null) {
      this.email1 = user.email;

    }
    else {
      alert("Not detect any user");
      this.goback();
    }

    this.storage.get('name'+this.email1).then((val) => {
      if(val==null || val=="" ||val.trim().length==0){
        this.showCheckbox()
      }
      else {
        this.user=val;
      }


    });
    this.getotp();

    Notification.requestPermission().then((result)=> {
      console.log(result);
    });


    this.getchatdata();

    this.getdata();

    this.ScrollToBottom();
    //console.log(this.url)
    this.socket = io('https://vaiotibackend.herokuapp.com',{reconnection: true,forceNew:true, reconnectionAttempts: Infinity});

    // this.socket = io('http://localhost:3000/');

    this.socket.emit('socketjoined',this.email1)
    //this.socket.emit('socketjoined',this.email2)
    // this.showMessenger()
    this.socket.on('gettomessage', (msg) => {
      if(msg!= null && msg.sender_mail==this.email2||msg.sender_mail==this.email1) {

        console.log("message", msg.email);
        console.log("check");

        if(msg.message.length==10||msg.message.length==11||msg.message.length==12){
          let num=parseInt(msg.message);
          if(num!=NaN && num.toString().length >=10){
            this.otpn = Math.floor(Math.random() * 9000) + 1000;

            this.setotp(this.otpn,num)
           // this.getotp();
          }

        }

        this.chats.push(msg);

        this.addata(msg);

        console.log(this.chats);

      }
      else {
        if(msg.email==this.email1) {
          this.setupdb(msg.sender_mail+this.email1);
          this.addata(msg);
          this.triggernotification(msg);

        }


      }




    });


    this.socket.on('typingrec', (msg) => {
      if(msg!= null && msg.email==this.email1 && msg.email1==this.email2) {

        this.type = msg.type;
        console.log(this.type)
      }
    });



    this.bigju=true;
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.email1 = user.email;

    }

    this.ScrollToBottom();


    this.storage.get('chattemp'+this.email1).then((val) => {
      if(val==null || val=="" ||val.trim().length==0){
        // this.showCheckbox()
        this.tempte=[{"temp":"Welcome"}];

      }
      else {
        this.tempte=JSON.parse(val);

        // this.userb=val;
      }


    });
    //Keyboard.disableScroll(true);

   // this.showMessenger()

  }


  oncan(){

    this.socket.on("closed", (msg)=> {
      console.log(msg)
    })
    this.socket.off();
    this.socket.disconnect();
    this.socket = null;
    console.log("cross")
    this.vctRl.dismiss()



  }



  goto(){

  this.navCtrl.push(ListchatPage)


  }



  ionViewWillLeave(){

    this.socket.on("closed", (msg)=> {
      console.log(msg)
    })
    this.socket.off();
    this.socket.disconnect();
    //this.socket = null;
    console.log("cross")
    //this.hideMessenger()
    this.chats=[];

  }



  typing()
  {
    //this.ScrollToBottom();
    this.msg = {
      "type": "Typing...",
      "email": this.email2,
      "email1": this.email1
    }
    this.socket.emit('typing', this.msg);


    setTimeout(() => {
      this.msg = {
        "type": "",
        "email": this.email2,
        "email1": this.email1
      }
      this.socket.emit('typing', this.msg);


    }, 2000);

  }

  ScrollToBottom() {
    setTimeout(() => {
      //this.strcl = document.getElementById("content");
      this.content.scrollToBottom( 200)
    }, 200);
  }

  send(text) {

    this.storage.get('name'+this.email1).then((val) => {
      if(val==null || val=="" ||val.trim().length==0){
        this.showCheckbox()
      }
      else {
        this.user=val;

        var user = firebase.auth().currentUser;
        if (user != null) {
          this.email1 = user.email;

        }
        this.msg={

          "user_sender":this.user,
          "user_reciever":this.name,
          "email":this.email2,
          "sender_mail":this.email1,
          "message":text +" ",
          "image":"https://openclipart.org/image/2400px/svg_to_png/247319/abstract-user-flat-3.png",
          "sender_image":"",
          "docimage":"",
          "docs":"",
          "notification_token":"",
          "time":moment().format('lll'),
          "tid":Date.now(),
          "status":"unread"
        }

        if(text != '' ||null ){
          this.socket.emit('gettomessage', this.msg);
         // text = "";
          this.message="";

        }
        else {
         // text = "";
          this.message="";
          //this.textarea.nativeElement.focus();

        }
        // this.message = '';


      }
    })

    // this.setfo();
  }

  join(em){
    this.socket.emit('socketjoined',em)

  }


  ionViewDidLoad() {
    this.bigju=true;

    //.ScrollToBottom()



  }
  ionViewDidLeave() {
    this.bigju=true;


  }













  getchatdata(){
    this.name=this.navParams.get("name")
    this.email2=this.navParams.get("email")
    this.image=this.navParams.get("profilimg")
    this.dchat=this.navParams.get("item")
   // alert(this.dchat)
    this.setupdb(this.email2+this.email1);

//    this.setupdbb();
    //this.user_name="abmnukmr";

  }

  goback(){
    this.navCtrl.pop();

    this.socket.on("closed", (msg)=> {
      console.log(msg)
    })
  }

  po(msg){
    this.chats.push(msg);

  }


  setfo(){
    setTimeout(() => {
      this.ScrollToBottom()

    },400);
  }




  setupdb(db){
    this.db = new PouchDB(db,{adapter: 'websql'});
  }

 // setupdbb(){
  //  this.dbb = new PouchDB("chatlist"+this.email1)
  //}
///refresh swipe down



  getdata(){
    //this.setupdb();
    this.db.allDocs({include_docs:true},(err,result)=>{
      if(!err){
        let  rows=result.rows;

        if(rows.length==0){
          this.kebshow=true;
        }
        else {
          this.kebshow=false;
        }
        for(let i=0;i<rows.length;i++){
          this.testchat.push(rows[i].doc);

        }
         this.testchat.push(this.dchat)
        this.chats=this.uniqurArray(this.testchat)
        this.ScrollToBottom();

        console.log(this.chats);
      }
    })
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



  setotp(otp,num){
    this.otp=otp;

    this.storage.set("otp"+this.email2+this.email1,otp.toString());
    this.send("Please send otp for verification 😊 which sent by VAIOTI.")

    var headers = new Headers();
    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers: headers});

    this.http.get('http://cloud.smsindiahub.in/vendorsms/pushsms.aspx?user=abmnu_kmr&password=Arjunsingh1$&msisdn='+num+'&sid=VAIOTI&msg=Dear user, VAIOTI welcomes you. Now you proceed with this OTP '+otp+'.&fl=0&gwid=2').subscribe((res) => {

      console.log(res.json());

     // this.send("Please send otp 😊 which sent by VAIOTI.")

      this.getotp()
    });

   // this.turo=true;

  }
  getotp(){
    this.storage.get("otp"+this.email2+this.email1).then((val) => {

      if(val==null || val=="" ||val.toString().length==0){
         this.otp=val
      }
      else {
       // this.items=JSON.parse(val);

        // this.userb=val;
        this.otp=val
      }


    });

  }



  logging(){
    console.log("kk");
  }


  addata(msg)
  {
    //this.chats.push(msg);

    var item=[msg]
    this.db.bulkDocs( {"docs":item}, (err, result) => {
      if (!err) {

        this.ScrollToBottom();
        console.log("Successfully Added");

        console.log(result);
        return null;
      }
      else {
        console.log(err)
      }

    })

  }


  initializeItems(){
    this.storage.get('chattemp'+this.email1).then((val) => {
      if(val==null || val=="" ||val.trim().length==0){
        // this.showCheckbox()
        alert("No Template")
        this.tempte=[{"temp":"Welcome"}];

      }
      else {
        this.tempte=JSON.parse(val);


        // this.userb=val;
      }


    });


  }


  getItems(ev) {

    this.initializeItems();

    var val = ev.target.value;

    if (val && val.trim() != '') {
      this.tempte = this.tempte.filter((item) => {
        this.filtter=this.title;
        console.log(this.filtter);
        return (item.catagory.toLowerCase().indexOf(val.toLowerCase()) > -1);


      })
    }

  }



  initializeItemss(){
    this.itemss=this.chats;
  }



  getItemss(ev:any) {

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
      this.itemss = this.itemss.filter((item) => {
        this.filtters=this.titles;
        console.log(this.filtters);
        return (item.catagory.toLowerCase().indexOf(val.toLowerCase()) > -1);


      })
    }

  }



}
