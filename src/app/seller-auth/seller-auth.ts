import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Seller } from '../services/seller';
import{Router} from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-auth.html',
  styleUrl: './seller-auth.css',
})
export class SellerAuth implements OnInit {

  constructor(private sellerService: Seller, private router:Router) {}

  ngOnInit(): void {}

  signUp(data: object): void {
    console.warn(data);
this.sellerService.userSignUp(data).subscribe((result) => {
  if (result) {   
  this.router.navigate(['/seller-home']);
}});
  
  }
}
