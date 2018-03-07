//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  data:any;
  constructor(public httpn: Http, public http:Http) {
    console.log('Hello Notification Provider');
  }

  notification(){

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.httpn.get('https://vaiotibackend.herokuapp.com/public/notification')
        .map(res => res.json())

        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  createReview(em,tid){

    return new Promise(resolve => {

      var update = {
        "tid": tid
      }

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('https://vaiotibackend.herokuapp.com/user/noti/lastmessage/' + em, JSON.stringify(update), {headers: headers})
        .map(res => res.json())

        .subscribe(res => {
          console.log(res.json());
        });
    })

  }







}
