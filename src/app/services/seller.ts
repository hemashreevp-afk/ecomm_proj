import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Seller   {
  constructor(private http: HttpClient) {}
  userSignUp(data:object){
    console.warn("seller sign up")
    return this.http.get('http://localhost:3000/seller')  //adding the data to json server for seller sign up  
    console.warn("result");
  }

}
