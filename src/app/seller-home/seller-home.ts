import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService  } from '../services/product';
import { Product } from '../data-type';
import { ChangeDetectorRef } from '@angular/core';  
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faTrash  } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
   templateUrl: './seller-home.html',
  styleUrl: './seller-home.css',
})
export class SellerHome implements OnInit   {
  productList: Product[] = []; //empty product list declaration
  icon=faTrash;// delete  icon for delete action
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
