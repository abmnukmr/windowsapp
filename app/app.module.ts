import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LogpagePage} from "../pages/logpage/logpage";
import {WalletPage} from "../pages/wallet/wallet";
import {ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import {AdditemPage} from "../pages/additem/additem";
import {AphoneverPage} from "../pages/aphonever/aphonever";
import {EdititemPage} from "../pages/edititem/edititem";
import {OnemorePage} from "../pages/onemore/onemore";
import {PhoneverPage} from "../pages/phonever/phonever";
import {ProfilephotoPage} from "../pages/profilephoto/profilephoto";
import {QrcodePage} from "../pages/qrcode/qrcode";
import {ShopdetPage} from "../pages/shopdet/shopdet";
import {ShopopenPage} from "../pages/shopopen/shopopen";
import {TitlecontactPage} from "../pages/titlecontact/titlecontact";
import {TitlediscriptionPage} from "../pages/titlediscription/titlediscription";
import {TitleeditorPage} from "../pages/titleeditor/titleeditor";
import {TitleitemPage} from "../pages/titleitem/titleitem";
import {OrderByPipe} from "../pipes/order-by/order-by";
//import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {QRCodeComponent} from "../angular2-qrcode/angular2-qrcode.component";
import {AngularFireModule } from 'angularfire2';
import * as firebase from "firebase";
import {AotpPage} from "../pages/aotp/aotp";
import {FavouriteProvider } from '../providers/favourite/favourite';
import {OtpPage} from "../pages/otp/otp";
import {TermsPage} from "../pages/terms/terms";
import {NotificationProvider } from '../providers/notification/notification';
import {ChatbotPage} from "../pages/chatbot/chatbot";
import {ChatlistPage} from "../pages/chatlist/chatlist";
//import {WalletPage} from "../pages/wallet/wallet";
//import { IonicStorageModule } from '@ionic/storage';
import { ElasticModule } from 'angular2-elastic';
import {ListchatPage} from "../pages/listchat/listchat";
import {SearchPipe} from "../pipes/search/search";
import {IonicStorageModule, Storage} from "@ionic/storage";
import {SafeHtmlPipe} from "../pipes/safe-html/safe-html";
import {QuicklistPage} from "../pages/quicklist/quicklist";
import {QuillEditorComponent} from "../vaioti-editor/quillEditor.component";
import {VaiotiTextComponent} from "../components/vaioti-text/vaioti-text";
import {DroplistPage} from "../pages/droplist/droplist";

export const firebaseConfig = {

  apiKey: "AIzaSyCVEzHic2bictd5sS6039WCYa8oXOchyoA",
  authDomain: "vaiotilic-bf004.firebaseapp.com",
  databaseURL: "https://vaiotilic-bf004.firebaseio.com",
  projectId: "vaiotilic-bf004",
  storageBucket: "",
  messagingSenderId: "186028153406"
};




firebase.initializeApp(firebaseConfig);



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LogpagePage,
    WalletPage,
    AdditemPage,
    AphoneverPage,
    EdititemPage,
    OnemorePage,
    PhoneverPage,
    ProfilephotoPage,
    QrcodePage,
    ShopdetPage,
    ShopopenPage,
    TitlecontactPage,
    TitlediscriptionPage,
    TitleeditorPage,
    TitleitemPage,
    OrderByPipe,
    AotpPage,
    OtpPage,
    QRCodeComponent,
    TermsPage,
    ChatlistPage,
    ChatbotPage,
    ListchatPage,
    SearchPipe,
    SafeHtmlPipe,
    QuicklistPage,
    VaiotiTextComponent,
    DroplistPage

  ],
  imports: [
    ElasticModule,
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb']
    }),
    AngularFireModule.initializeApp(firebaseConfig)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LogpagePage,
    WalletPage,
    AdditemPage,
    AphoneverPage,
    EdititemPage,
    OnemorePage,
    PhoneverPage,
    ProfilephotoPage,
    QrcodePage,
    ShopdetPage,
    ShopopenPage,
    TitlecontactPage,
    TitlediscriptionPage,
    TitleeditorPage,
    TitleitemPage,
    QRCodeComponent,
    AotpPage,
    OtpPage,
    TermsPage,
    ChatlistPage,
    ChatbotPage,
    ListchatPage,
    QuicklistPage,
    DroplistPage
    ],
  providers: [
    ConnectivityServiceProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectivityServiceProvider,
    FavouriteProvider,
    NotificationProvider
  ]
})
export class AppModule {}
