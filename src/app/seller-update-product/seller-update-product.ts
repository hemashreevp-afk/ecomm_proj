import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  imports: [CommonModule,FormsModule],
  templateUrl: './seller-update-product.html',
  styleUrl: './seller-update-product.css',
})


export class SellerUpdateProduct implements OnInit {
  delProductMessage: string |undefined; //used to store the success message when a product is added successfully
   selectedFile: File | null = null;//used to store the selected file for product image upload  
  imagePreview: string | ArrayBuffer | null = null;//preview of selecteed image before uploading
  productData = {id:0 ,name: '',description:'',category:'',colour:'',imageUrl:'', price: 0,  } // initialize all required fields
//productData: Product | undefined;// declared for update the product data in  update form

  constructor(private route:ActivatedRoute, private product:ProductService){}
  ngOnInit(): void {
  let productId=this.route.snapshot.paramMap.get('id'); //getting the product for populate updation
  console.log(productId);// to show product id
   
  productId && this.product.getProduct(productId).subscribe((data)=>{
    console.log(data);//product data fetched  usingproduct id
    this.productData=data;
    // show existing image
  this.imagePreview = data.imageUrl;
  })
    
  }

  /*
  // function for  uplaod the file url and preview the file
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.productData.imageUrl = reader.result as string; // update imageUrl for submission
      };
       reader.readAsDataURL(file);   // IMPORTANT
    }
  }*/

 // IMAGE SELECT
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.productData.imageUrl = 'assets/images/' + file.name; //set new image after selection
      this.imagePreview=this.productData.imageUrl;// Set imageUrl for submission
    }
  }




  // Submit form data
  submit(formValue: Product){
    // Prepare FormData for backend
    const formData = new FormData();
    formData.append('id', this.productData.id.toString());
    formData.append('name', this.productData.name);
    formData.append('description', this.productData.description);
    formData.append('price', this.productData.price.toString());
    formData.append('category', this.productData.category);
    formData.append('colour', this.productData.colour);


  if (this.selectedFile) {
  formData.append('image', this.selectedFile); // send real file
} else {
  formData.append('imageUrl', this.productData.imageUrl);
}

 console.log('Form data to submit:', formValue); // Log the form data for debugging
 if(this.productData){
  formValue.id=this.productData.id;
 console.log('Form data to submit:', this.productData)
  
 }
}

}
