import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  NavController, NavParams, ViewController, Platform, ActionSheetController,
  ToastController, LoadingController, Loading
} from 'ionic-angular';
import * as firebase from "firebase/app";
import {WalletPage} from "../wallet/wallet";
import { FormControl, FormBuilder, FormGroup } from "@angular/forms";


//import * as cropperjs from "cropperjs";
/*
  Generated class for the Additem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var cordova: any;
declare var cordova: any;
@Component({
  selector: 'page-additem',
  templateUrl: 'additem.html'
})
export class AdditemPage {
  spinshow:boolean=true;
  lastImage=[] ;
  show:boolean=true;
  loading: Loading;
  forupload:any;
  itemprice:any;
  itemnumber:any;
  base64Image;
  email1:string;
  butn:boolean=false;
  itemname:any;
  images = [];
  imgin;
  targetimages=[];
  discription:string="hiuhi";
//  private cropper:cropperjs.Cropper;



  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    placeholder: "insert content..."
  };
  trigger:boolean=false;

  @ViewChild('imageSrc') input: ElementRef;
  item: FormControl;


  constructor(private formBuilder: FormBuilder,public navCtrl: NavController, public victrl:ViewController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });


  }

  ionViewDidLoad() {


    console.log('ionViewDidLoad AdditemPage');
  }

  ionViewWillLoad() {
   this.item = this.formBuilder.control('');
  }


  onEditorBlured(quill) {
    console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    console.log('quill is ready! this is current quill instance object', quill);
  }

  onContentChanged({ quill, html, text }) {
    console.log('quill content is changed!', quill, html, text);
  }

  ngOnInit() {
    setTimeout(() => {
      this.editorContent = '<h1>content changed!</h1>';
      console.log('you can use the quill instance object to do something', this.editor);
      // this.editor.disable();
    }, 2800)
  }

  Dismiss4() {
    this.victrl.dismiss();

  }













  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

// Always get the accurate path to your apps folder






}
