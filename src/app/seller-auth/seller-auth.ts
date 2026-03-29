import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Seller } from '../services/seller';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { signup, login } from '../data-type';
import { AlertCommands } from '../alert-commands/alert-commands';//alert component
import { Subject } from 'rxjs';
import { take, filter,takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertCommands], // ✅ add AlertCommands component
  templateUrl: './seller-auth.html',
  styleUrl: './seller-auth.css',
})
export class SellerAuth implements OnInit, OnDestroy {

  isLoginSuccess = false;//Track login success
  showLogin: boolean = false; //used to toggle between login and sign up forms
  private lastLoginForm: any; // store reference to login form

  @ViewChild('alertBox') alert!: AlertCommands;//Add ViewChild to Control Alert
  private destroy$ = new Subject<void>();
 

  constructor(
    private sellerService: Seller,
    private router: Router) { }

  ngOnInit(): void {
    // this.sellerService.reLoadSeller();//reloading the seller data when the component is initialized

    // subscribe once to error/success changes
    this.sellerService.loginStatus
      .pipe(
        filter(status => status!== null), // ignore initial null
        takeUntil(this.destroy$)
      )
      .subscribe(status => {
        if (!this.alert) return; // prevent showing before ViewChild is ready
        if (status === 'success') {      
          this.alert.show('success', 'Success!', 'Login successful');

          // Navigate after alert OK
          this.alert.onConfirm.pipe(take(1)).subscribe(() => {
            this.router.navigate(['/seller-home']);
          });
        }
        else if (status === 'error') {
          this.isLoginSuccess = false;
          this.alert.show('warning', 'Login Failed', 'Invalid email or password');
          
 // Reset the form after user clicks OK
          this.alert.onConfirm.pipe(take(1)).subscribe(() => {
            if (this.lastLoginForm) this.lastLoginForm.resetForm();
          });

        }
      });
  }
  ngAfterViewInit() {
    console.log('ViewChild alert:', this.alert);
  }

  signUp(form: any) {
    const data: signup = form.value; // get the form values
    console.warn('Attempting sign up with data:', data);
    this.sellerService.userSignUp(data);
    this.alert.show('success', 'Account Created', 'Signup successful!');
    form.resetForm();
  }


  login(data: login) {
    console.warn('Attempting login with data:', data);
    this.sellerService.userLogin(data);
  }
/*
  // Store login form reference here
  login(form: any) {
    this.lastLoginForm = form; // save for reset
    const data: login = form.value;
    this.sellerService.userLogin(data);
  }*/

  openLogin(): void {
    this.showLogin = true//used to toggle between login and sign up forms
  }
  openSignUp(): void {
    this.showLogin = false;//used to toggle between login and sign up forms
  }
  reLoadSeller() {
    if (localStorage.getItem('seller') && this.router.url === '/seller-auth') {
      this.router.navigate(['/seller-home']);
    }
  }
  handleConfirm() {
    console.log('Alert confirmed');
    console.log('Current URL before navigate:', this.router.url);
    if ( this.isLoginSuccess) {
      this.router.navigate(['/seller-home']).then(success => {
        console.log('Navigation success:', success);
        console.log('Current URL after navigate:', this.router.url);
      }).catch(err => {
        console.error('Navigation error:', err);
      });
      }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


