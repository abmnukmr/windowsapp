//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the FavouriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavouriteProvider {

  data:any;
  constructor(public http: Http) {
    console.log('Hello Favourite Provider');
  }




  load(id){



    if (this.data) {
      console.log("g");
      // return Promise.resolve(this.data);
      return new Promise(resolve => {


        this.http.get('https://vaiotibackend.herokuapp.com/favourite/user/' + id)
          .map(res => res.json())

          .subscribe(data => {
              this.data = data;
              resolve(this.data);
              //console.log(data);
              console.log("reloded");

            },
            err => {
              console.log("Oops!");

            }
          );


      });


    }

    return new Promise(resolve => {


      this.http.get('https://vaiotibackend.herokuapp.com/favourite/user/' + id)
        .map(res => res.json())
        .subscribe(data => {
            this.data = data;
            resolve(this.data);
            //console.log(data);
            console.log("ghdgggg");


          },

          err => {
            //          this.data={"error":"error"};
            console.log("Oops");

            //  return this.errror=2;


          },
          ()=>{
            console.log("Done");
//              errror=2;

            //return this.errror=2;

          }
        );


    });
  }




}
