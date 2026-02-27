import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { login, signup } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class Seller {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);//used for authentication of seller and to keep track of the login status of the seller
  isLoggedInError = new EventEmitter<boolean>(false);//login error when enter wrong email or password  

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: signup): void {
    this.http.post<any>('http://localhost:3000/seller', data,
    { observe: 'response' }).subscribe((result) => {
      if (result.status === 201) {
       localStorage.setItem('seller', JSON.stringify(result.body));  //storing the seller data in local storage  after the sign up  
       this.router.navigate(['/seller-home']);//navigating to the seller home page after the sign up  
        return result.body;
      }
    });
  }



 reLoadSeller() {
  if (localStorage.getItem('seller')) {
    this.isSellerLoggedIn.next(true);
    this.router.navigate(['/seller-home']);
  }
}

  // Login: checks if seller exists
  userLogin(data: login) {
   
     this.http.get<any>(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      {
        observe: 'response'}).subscribe((result) => {
          console.warn(result)
        if (result.status === 200 && result.body.length ==1) {
          //this.isSellerLoggedIn.next(true);//used for authenicattion of seller
         this.isLoggedInError.emit(false); // Emit false to indicate login success
          localStorage.setItem('seller', JSON.stringify(result.body[0]));  //storing the seller data in local storage  after the login
          this.router.navigate(['/seller-home']);//navigating to the seller home page after the sign up  
        return result.body;
      }
      else {
        alert('Login failed: Invalid email or password');
        this.isLoggedInError.emit(true); // Emit true to indicate login failure
      }
  });
  }
}