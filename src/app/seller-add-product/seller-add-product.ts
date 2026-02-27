import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import{ ProductService} from '../services/product';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-add-product.html',
  styleUrl: './seller-add-product.css',
})
export class SellerAddProduct implements OnInit  {
  addProductMessage: string |undefined; //used to store the success message when a product is added successfully
  constructor(private productService: ProductService) { }

  ngOnInit(): void {

  } 
  submit(data:Product): void {
    console.warn('Product data submitted:', data);
    this.productService.addProduct(data).subscribe((response) => {
      console.log('Product added successfully:', response);
      alert('Product added successfully!');
      if(response){
        this.addProductMessage = 'Product added successfully!';
      }
    });
    setTimeout(() => {
      this.addProductMessage = undefined; // Clear the message after 3 seconds
    }, 3000);

  }

}

