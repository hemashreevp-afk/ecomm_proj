import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Seller } from '../services/seller';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-auth.html',
  styleUrl: './seller-auth.css',
})
export class SellerAuth implements OnInit {

  constructor(private sellerService: Seller, private router: Router) {}

  ngOnInit(): void {
    this.sellerService.reLoadSeller();
  }

  signUp(data: object): void {

    this.sellerService.userSignUp(data).subscribe((result: any) => {

      if (result) {
        this.sellerService.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result));
        this.router.navigate(['/seller-home']);
      }

    });

  }
}
