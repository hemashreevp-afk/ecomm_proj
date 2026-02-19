import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Seller } from '../services/seller';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.html',
  styleUrl: './seller-auth.css',
})
export class SellerAuth implements OnInit {
showLogin: boolean = false; //used to toggle between login and sign up forms
  constructor(private sellerService: Seller, private router: Router) {}

  ngOnInit(): void {
    this.sellerService.reLoadSeller();//reloading the seller data when the component is initialized
  }

  signUp(data: object): void {

    this.sellerService.userSignUp(data).subscribe((result: any) => {//subscribing to the userSignUp method of the seller service and passing the data object as a parameter
      if (result) {
        this.sellerService.isSellerLoggedIn.next(true);//used for authenicattion of seller
        localStorage.setItem('seller', JSON.stringify(result));  //storing the seller data in local storage  after the sign up
        this.router.navigate(['/seller-home']);//navigating to the seller home page after the sign up
      }

    });

  }
login(data: object): void {
    this.sellerService.userLogin(data).subscribe((result: any) => {//subscribing to the userSignUp method of the seller service and passing the data object as a parameter
      if (result && result.length > 0) {
        this.sellerService.isSellerLoggedIn.next(true);//used for authenicattion of seller
        localStorage.setItem('seller', JSON.stringify(result));  //storing the seller data in local storage  after the login
        this.router.navigate(['/seller-home']);//navigating to the seller home page after the login
      }

    });

  }
  openLogin(): void {
    this.showLogin = true//used to toggle between login and sign up forms
  }
 openSignUp(): void {
    this.showLogin = false;//used to toggle between login and sign up forms
  }
}
