import { Injectable } from '@angular/core';
//import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';

declare var Connection;
/*
  Generated class for the ConnectivityServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConnectivityServiceProvider {
  onDevice: boolean;

  constructor(public platform: Platform) {
    this.onDevice = this.platform.is('cordova');
  }
}
