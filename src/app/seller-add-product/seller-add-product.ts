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
   selectedFile: File | null = null;//used to store the selected file for product image upload  
  imagePreview: string | ArrayBuffer | null = null;//preview of selecteed image before uploading
  
  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
   


  } 

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);   // IMPORTANT
    }
  }

  submit(data:Product): void {
     if (this.selectedFile) {
    data.imageUrl = 'assets/images/' + this.selectedFile.name;
    console.warn('imageUrl set to:', data.imageUrl);
  }
    console.warn('Product data submitted:', data);
    this.productService.addProduct(data).subscribe((response) => {
      console.log('Product added successfully:', response);
      alert('Product added successfully!');
      if(response){
        this.addProductMessage = 'Product added successfully!';
      }
    }, (error) => {
      console.error('Error adding product:', error);
      alert('Error adding product!');
    } );
    setTimeout(() => {
      this.addProductMessage = undefined; // Clear the message after 3 seconds
    }, 3000);

  }

}

