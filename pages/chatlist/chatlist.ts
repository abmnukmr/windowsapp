import {Component, NgZone} from '@angular/core';
import {AlertController, ModalController, NavController, PopoverController} from 'ionic-angular';
import PouchDB from 'pouchdb';
import * as io from 'socket.io-client';
import {ChatbotPage} from "../chatbot/chatbot";
import * as firebase from "firebase/app";
import { Storage } from '@ionic/storage';
import * as moment from 'moment'
import {RequestOptions, Headers, Http} from "@angular/http";

import  Pouchdballdbs   from 'pouchdb-all-dbs'
import { Observable } from 'rxjs';
import {FavouriteProvider} from "../../providers/favourite/favourite";
import {NotificationProvider} from "../../providers/notification/notification";
import {LogpagePage} from "../logpage/logpage";
import {DroplistPage} from "../droplist/droplist";
PouchDB.plugin(Pouchdballdbs)

//import PouchFind from 'pouchdb-find';
//PouchDB.plugin(Pouchdb-all-dbs)
//import {storage} from 'ionic-native';


/*
  Generated class for the ChatlistPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


@Component({
  selector: 'page-chatlist',
  templateUrl: 'chatlist.html'
})



export class ChatlistPage {

  filtter:any;
  title:any;
   items:any;
  iname:string="";
  db:any;
  llastmessge:any;
  lrip:any;
  dbb:any;
  refreshh:any="";
  data:any;
  chatret=[];
  messageCount:any=0
  rowss:any;
  lastmessage:string="";
  Lastarray:any=[];
  val:any;
  len:any;
  index:any;
  alldbs:any=[];
  socket:any;
  recmail:any="";
  type:any="";
  user:any=[];
  userb:string="";
  email1:any;
  badge:any;
  token:any;
  trio:any;
  item:any;
  chatlist=[];
  private wendort: any;
  constructor(public popoverCtrl: PopoverController,public ntj:NotificationProvider,public zone:NgZone,public http:Http,public _favrouite:FavouriteProvider,public alertCtrl:AlertController,public navCtrl: NavController,public Mdl:ModalController,public storage:Storage) {


    // this.loadi();

   // PouchDB.plugin(Pouchdballdbs)


/*
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

*/








    PouchDB.plugin(Pouchdballdbs)

    var user = firebase.auth().currentUser;
    if (user != null) {
      this.email1 = user.email;

    }else {
      //alert("No email")
    }







    this.zone.run(()=> {
      setInterval(()=>{


        var user = firebase.auth().currentUser;
        if (user != null) {
          var name = user.displayName;
          this.email1 = user.email;
          var photoUrl = user.photoURL;
        }

        console.log("last message read ");
        this._favrouite.load(this.email1).then((data) => {
          console.log(JSON.stringify(data) + "shop data");
          this.wendort = data
          console.log(this.wendort);
          this.lrip = this.wendort.lastmessage;
          this.llastmessge = this.lrip[0];
          console.log(this.lrip);

          console.log(this.llastmessge);

          this.messageCount = this.lrip.length;
          if(this.messageCount!=0 ) {
            //this.loadi()

            this.refr();

            for(let i=0;i<this.messageCount;i++){

              //this.Lastarray.push(this.lrip[i])


              var index= this.Lastarray.findIndex(obj => obj.sender_mail==this.lrip[i].sender_mail);


              if(index != -1)
            {
              /*

              "user_sender": "jk",
              "user_reciever": "Abmnu",
              "email": "developer.abmnu@gmail.com",
              "sender_mail": "abmnukmr@gmail.com",
              "message": "Welcome ",
              "image": "https://openclipart.org/image/2400px/svg_to_png/247319/abstract-user-flat-3.png",
              "sender_image": "",
              "docimage": "",
              "docs": "",
              "notification_token": "",
              "time": "9:02 PM",
              "tid": 1517758333536

               */

              this.Lastarray[index].user_sender = this.lrip[i].user_sender;
              this.Lastarray[index].user_reciever = this.lrip[i].user_reciever;
              this.Lastarray[index].email = this.lrip[i].email;
              this.Lastarray[index].sender_mail = this.lrip[i].sender_mail;
              this.Lastarray[index].message ="<b style='color: #ffaf24'>"+ this.lrip[i].message +"</b>";
              this.Lastarray[index].image = this.lrip[i].image;
              this.Lastarray[index].sender_image = this.lrip[i].sender_image;
              this.Lastarray[index].docs = this.lrip[i].docs;
              this.Lastarray[index].notification_token = this.lrip[i].notification_token;
              this.Lastarray[index].time = this.lrip[i].time;
              this.Lastarray[index].tid = this.lrip[i].tid;
            }
            else {
                var index2 = this.Lastarray.findIndex(obj => obj.email==this.lrip[i].sender_mail );

                if(index2 != -1){

                  this.Lastarray[index2].user_sender = this.lrip[i].user_sender;
                  this.Lastarray[index2].user_reciever = this.lrip[i].user_reciever;
                  this.Lastarray[index2].email = this.lrip[i].email;
                  this.Lastarray[index2].sender_mail = this.lrip[i].sender_mail;
                  this.Lastarray[index2].message ="<b style='color: #ffaf24'>"+ this.lrip[i].message +"</b>";
                  this.Lastarray[index2].image = this.lrip[i].image;
                  this.Lastarray[index2].sender_image = this.lrip[i].sender_image;
                  this.Lastarray[index2].docs = this.lrip[i].docs;
                  this.Lastarray[index2].notification_token = this.lrip[i].notification_token;
                  this.Lastarray[index2].time = this.lrip[i].time;
                  this.Lastarray[index2].tid = this.lrip[i].tid;
                }else {

                  this.Lastarray.unshift(this.lrip[i])

                }
            }

            }


          }
          else {

          }

          //this.loadi()





        });

      },900)

    });





    this.storage.get('name'+this.email1).then((valu) => {
      if(valu==null || valu=="" ||valu.trim().length==0){
        //alert(this.email1)
        this.showCheckbox()

      }
      else {
        this.userb=valu;
      }


    });




  }


  ionViewDidLoad() {
    //alert("ionDidviewload")
   // this.loadi();

//    this.get_alldbs()


  }


goto(){
    this.navCtrl.push(DroplistPage);
   }



  showCheckbox() {
    let prompt = this.alertCtrl.create({
      title: 'Add your Name',
      message: "Set your Name or Store Name if you have store on VAIOTI",
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
            this.userb=data.name;
            this.storage.set('name'+this.email1, data.name);

            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }



  loadi() {
//    PouchDB.plugin(Pouchdballdbs)


     console.log("loadinng  g g gngngngnngng")
    var user = firebase.auth().currentUser;
    if (user != null) {
      var name = user.displayName;
      this.email1 = user.email;
      var photoUrl = user.photoURL;
    }



    PouchDB.plugin(Pouchdballdbs)

    PouchDB.allDbs().then((dbs)=> {

      this.alldbs=dbs;

//      alert("Adding....  all sets")


      this.Lastarray=[]
      for(let i=0; i<this.alldbs.length;i++)
      {
        var fi=this.getdata(this.alldbs[i])

        //this.Lastarray.push(this.getdata(this.user[i].email))

      }
      // alert("All type of array included"+this.alldbs +this.alldbs.length)
      // dbs is an array of strings, e.g. ['mydb1', 'mydb2']
    }).catch( (err)=> {

      alert("error :("+ err)

      // handle err
    });




    console.log("last message read ");
    this._favrouite.load(this.email1).then((data) => {
      console.log(JSON.stringify(data) +"shop data");
      this.wendort =data
      console.log(this.wendort);
      this.lrip= this.wendort.lastmessage;
      this.llastmessge=this.lrip[0];
      console.log(this.lrip);

      console.log(this.llastmessge);
      if(this.llastmessge!= ""||this.llastmessge!=null) {


        for (let i = 0; i < this.lrip.length; i++) {
          console.log(this.lrip[i] + this.lrip[i].sender_mail + "Check for aviation check")


          this.setupdb(this.lrip[i].sender_mail+this.email1)
          this.item =[this.lrip[i]]


          this.db.bulkDocs( {"docs":this.item}, (err, result) => {
            if (!err) {

              // this.clearlastmessage(this.email1);
              console.log("Successfully Added");
              this.ntj.createReview(this.email1,this.lrip[i].tid).then(() => {


              });
              console.log(result);
              return null;
            }
            else {
              console.log(err)
            }

          })

          // this.setupdb(this.lrip[i].sender_mail + this.email1);


        }
//        this.get_alldbs()



      }


    });


  }




  ionViewDidLeave(){
    this.socket.disconnect();

    clearInterval(this.trio);
  }


  ionViewDidEnter(){


    var user = firebase.auth().currentUser;
    if (user != null) {
      var name = user.displayName;
      this.email1 = user.email;
      var photoUrl = user.photoURL;
    }

    //alert("entering page")
   // this.socket.connect()
    PouchDB.plugin(Pouchdballdbs)

    this.loadi()


  }


  reg(){
    this.loadi()
    this.get_alldbs()
    this.dore();

  }


  change(){
    this.db.changes().on('change', ()=> {
      console.log('Ch-Ch-Changes');
    });
  }


  rty(){
    setTimeout(()=>{
      this.user=[];
      this.Lastarray=[];
      // clearInterval(this.trio);
      this.refresh();
      // this.join();
      this.socket.on("closed", (msg)=> {
        console.log(msg)
      })
      //this.socket.off();
      //this.socket = null;
      console.log("cross")

      console.log("jjgsjhagjhags")


    },300)
  }


  ionViewWillLeave(){
    this.user=[];
    this.Lastarray=[];
    clearInterval(this.trio);
    this.refresh();
    // this.join();
   // this.socket.on("closed", (msg)=> {
      //console.log(msg)
   // })
    //this.socket.off();
    //this.socket = null;
    console.log("cross")

    console.log("jjgsjhagjhags")

  }


  refr(){
     this.refreshh= " "+"...";
    //this.socket.connect()
    PouchDB.plugin(Pouchdballdbs)


    console.log("last message read ");
    this._favrouite.load(this.email1).then((data) => {
      console.log(JSON.stringify(data) +"shop data");
      this.wendort =data
      console.log(this.wendort);
      this.lrip= this.wendort.lastmessage;
      this.llastmessge=this.lrip[0];
      console.log(this.lrip);

      console.log(this.llastmessge);
      if(this.llastmessge!= ""||this.llastmessge!=null) {


        for (let i = 0; i < this.lrip.length; i++) {
          console.log(this.lrip[i] + this.lrip[i].sender_mail + "Check for aviation check")


          this.setupdb(this.lrip[i].sender_mail+this.email1)
          this.item =[this.lrip[i]]


          this.db.bulkDocs( {"docs":this.item}, (err, result) => {
            if (!err) {

              // this.clearlastmessage(this.email1);
              console.log("Successfully Added");
              this.ntj.createReview(this.email1,this.lrip[i].tid).then(() => {


              });
              console.log(result);
              return null;
            }
            else {
              console.log(err)
            }

          })

          // this.setupdb(this.lrip[i].sender_mail + this.email1);


        }
//        this.get_alldbs()



      }


    });




    setTimeout(()=>{
      this.refreshh="";

    },3000)

  }


  join(){
    for(let i=0; i<this.user.length; i++){
      this.socket.emit('socketjoined',this.user[i].email)

    }
  }







  refresh(){

    for(let i=0; i<this.user.length;i++)
    {
      var fi=this.getdata(this.user[i].email)

      //this.Lastarray.push(this.getdata(this.user[i].email))

    }

  }

  dore(){
    this.Lastarray=[];
    this.get_alldbs()

    for(let i=0; i<this.alldbs.length;i++)
    {
      var fi=this.getdata(this.alldbs[i])

      //this.Lastarray.push(this.getdata(this.user[i].email))

    }

  }

  gotochatbot(name,image,email,item){


    let profileModal = this.Mdl.create(ChatbotPage,{"name":name,"profilimg":image,"email":email,"item":item});


    profileModal.onDidDismiss(data => {


      PouchDB.allDbs().then((dbs)=> {

        this.alldbs=dbs;

        this.Lastarray=[]
        for(let i=0; i<this.alldbs.length;i++)
        {
          var fi=this.getdata(this.alldbs[i])

          //this.Lastarray.push(this.getdata(this.user[i].email))

        }
        // alert("All type of array included"+this.alldbs +this.alldbs.length)
        // dbs is an array of strings, e.g. ['mydb1', 'mydb2']
      }).catch( (err)=> {

        alert(" error :("+ err)

        // handle err
      });

      console.log("hiiii");
    });
    profileModal.present();
  }



  setupdb(db){
    this.db = new PouchDB(db, {adapter: 'websql'});
  }



  sortByAttribue(arr, attribute) {
    return arr.sort((a,b)=> {
      return a.attribute < b.attribute;
    });

  }

  hoto(){

    let sum=4+3;
    return sum;
  }

  fromuserdel(i){
    alert("its in beta coming soon")
    this.deleterow(this.user[i]._id, this.user[i]._rev)

  }

  deleterow(id,rev){
    var docs = [{_id : id, _rev:rev , _deleted : true }]
    //Deleting Documents
    this.dbb.bulkDocs(docs, (err, response)=> {
      if (err) {
        return console.log(err);
      } else {
        this.dore();

        console.log(response+"Documents deleted Successfully");
      }
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.refr();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  getdata(db){
    this.setupdb(db);
    var as;
    var doc;
    this.db.allDocs({include_docs:true},(err,result)=>{
      if(!err){
        this.rowss=result.rows;

        this.rowss.sort((a, b)=> {
          return a.doc.tid -b.doc.tid;
        });
        let gi=this.rowss[this.rowss.length -1]

        var  as =gi.doc.message;
        this.lastmessage=as;
        console.log(gi.doc);


        this.Lastarray.push(gi.doc)
      }
    })

  }

  clearlastmessage(em,tid){
    this.zone.run(()=> {

      var update = {
        "tid": tid
      }
      /*
          this.http.get('http://ec2-13-127-108-137.ap-south-1.compute.amazonaws.com:3000/user/noti/lastmessage/' +em+"/"+tid)
            .map(res => res.json())
            .subscribe(data => {
                this.data = data;
                //resolve(this.data);
                //console.log(data);
                console.log("clear");

              },
              err => {
                console.log("Oops!");

              }
            );


      */


      console.log("updated start");
      var headers = new Headers();
      headers.append('content-type', 'application/json;charset=UTF-8');
      headers.append('Access-Control-Allow-Origin', '*');
      let options = new RequestOptions({headers: headers});

      this.http.post('https://vaiotibackend.herokuapp.com/user/noti/lastmessage/' + em, JSON.stringify(update), options)
      .subscribe(data => {
        console.log("token add")

      }, err => {
        console.log("Error!:", err.json());
        //   this.loading.dismissAll();
      });
      console.log("dwrwe ooooops");

    })


  }




  get_alldbs(){
    PouchDB.plugin(Pouchdballdbs)

    PouchDB.allDbs().then((dbs)=> {

      this.alldbs=dbs;

      this.Lastarray=[]
      for(let i=0; i<this.alldbs.length;i++)
      {
        var ln=this.email1.length;

        var nt=this.alldbs[i].slice(-ln)

        if(nt==this.email1) {
          var fi = this.getdata(this.alldbs[i])
        }
      }
      alert(JSON.stringify(this.Lastarray))

    }).catch( (err)=> {

      alert(" error :( "+ err)

    });


  }


  addata(msg)
  {
    this.setupdb(msg.sender_mail+this.email1)
    var item=[msg]
    this.db.bulkDocs( {"docs":item}, (err, result) => {
      if (!err) {

        console.log("Successfully Added");
        console.log(result);
        return null;
      }
      else {
        console.log(err)
      }

    })

  }


  deletedb(db,cm,tid){

    var index = this.Lastarray.findIndex(obj => obj.tid==tid);
    this.Lastarray.splice(index,1)


    //this.Lastarray= this.Lastarray.filter((a)=>{
      // return a.tid !=tid;
    //})



    if(db!=this.email1){
    var db = new PouchDB(db+this.email1, {adapter: 'websql'});
      db.destroy( (err, response)=> {
        if (err) {
          return console.log(err);
        } else {
          /*
          PouchDB.plugin(Pouchdballdbs)

          PouchDB.allDbs().then((dbs)=> {

            this.alldbs=dbs;

            this.Lastarray=[]
            for(let i=0; i<this.alldbs.length;i++)
            {
              var fi=this.getdata(this.alldbs[i])

            }
          }).catch( (err)=> {

            alert("error :("+ err)

          });
          console.log ('Database Deleted')
        */}
      });


    var db = new PouchDB(this.email1+db, {adapter: 'websql'});
    db.destroy( (err, response)=> {
      if (err) {
        return console.log(err);
      }
      else
        {
        /*
        PouchDB.plugin(Pouchdballdbs)

        PouchDB.allDbs().then((dbs)=> {

          this.alldbs=dbs;

          this.Lastarray=[]
          for(let i=0; i<this.alldbs.length;i++)
          {
            var fi=this.getdata(this.alldbs[i])

          }
        }).catch( (err)=> {

          alert("error  :("+ err)

        });
        console.log ('Database Deleted')
      */
      }
    });
  }
    else {
      var db = new PouchDB(cm+this.email1, {adapter: 'websql'});
      db.destroy( (err, response)=> {
        if (err) {
          return console.log(err);
        } else {
          /*
          PouchDB.plugin(Pouchdballdbs)

          PouchDB.allDbs().then((dbs)=> {

            this.alldbs=dbs;

            this.Lastarray=[]
            for(let i=0; i<this.alldbs.length;i++)
            {
              var fi=this.getdata(this.alldbs[i])

            }
          }).catch( (err)=> {

            alert("Db error hai"+ err)

            // handle err
          });
          console.log ('Database Deleted')
        */}
      });

      var db = new PouchDB(this.email1+cm, {adapter: 'websql'});
      db.destroy( (err, response)=> {
        if (err) {
          return console.log(err);
        } else {
          /*
          PouchDB.plugin(Pouchdballdbs)

          PouchDB.allDbs().then((dbs)=> {

            this.alldbs=dbs;

            this.Lastarray=[]
            for(let i=0; i<this.alldbs.length;i++)
            {
              var fi=this.getdata(this.alldbs[i])

            }
          }).catch( (err)=> {

            alert("DB error "+ err)
          });
          console.log ('Database Deleted')
        */
        }
      });
    }

  }

  initializeItems(){
  this.items=this.Lastarray;
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







  presentPopover(ev) {

    ///let listData = [{title:"Settings",id:1},{title:"Logout",id:2},{title:"Profile",id:3},{title:"Help",id:4}]


   let ab=this.Mdl.create(DroplistPage)
    ab.onDidDismiss(data => {
      alert(data);
    });
    ab.present()

  }




}
