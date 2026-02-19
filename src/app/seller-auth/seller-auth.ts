import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Seller } from '../services/seller';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { signup, login } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.html',
  styleUrl: './seller-auth.css',
})
export class SellerAuth implements OnInit {
showLogin: boolean = false; //used to toggle between login and sign up forms
authError: string = ''; //used to store the error message when login fails
constructor(private sellerService: Seller, private router: Router) {}

  ngOnInit(): void {
    this.sellerService.reLoadSeller();//reloading the seller data when the component is initialized
  }

  signUp(data: signup): void {
console.warn('Attempting sign up with data:', data);
this.sellerService.userSignUp(data);

    }

    login(data: login): void {
   console.warn('Attempting login with data:', data);
this.sellerService.userLogin(data); 
this.sellerService.isLoggedInError.subscribe((isError) => {
  console.warn('Login error status:', isError);     
  if (isError) {
    this.authError = 'Login failed: Invalid email or password'; 
        alert('Login failed: Invalid email or password');
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

