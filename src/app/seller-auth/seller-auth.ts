import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Seller } from '../services/seller';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-auth.html',
  styleUrl: './seller-auth.css',
})
export class SellerAuth implements OnInit {

  constructor(private sellerService: Seller) {}

  ngOnInit(): void {}

  signUp(data: any): void {
    console.warn(data);

    this.sellerService.userSignUp(data).subscribe({
      next: (result) => {
        console.log('Seller signup success', result);
      },
      error: (err) => {
        console.log('Signup failed', err);
      }
    });
  }
}
