import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService  } from '../services/product';
import { Product } from '../data-type';
import { ChangeDetectorRef } from '@angular/core';  
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faEdit, faTrash  } from '@fortawesome/free-solid-svg-icons'
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
   templateUrl: './seller-home.html',
  styleUrl: './seller-home.css',
})
export class SellerHome implements OnInit   {
  productList: Product[] = []; //empty product list declaration
  iconDelete=faTrash;// delete  icon for delete action
  iconEdit=faEdit;//icon for  edit
constructor(private productService: ProductService,private cd:ChangeDetectorRef) { }

 ngOnInit(): void {
  console.log('SellerHome Loaded');

      this.productService.productList().subscribe({
      next: (result) => {
        console.log('Data received', result);
        this.productList = result;
        this.cd.detectChanges(); //  ensure view updates
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
}
  deleteProduct(id: number) {
  this.productService.deleteProduct(id).subscribe((result) => {
    alert("Product deleted successfully" + result);
  });
  this.productList=this.productList.filter(product => product.id !== id); // Update local list to reflect deletion
}
}
