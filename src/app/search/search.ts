import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product';
import { Product } from '../data-type';
import { FormGroup, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-search',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {

  searchResult: Product[] = [];


  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
   private cd: ChangeDetectorRef
  ) {  }
  ngOnInit(): void {
  //  let query = this.activeRoute.snapshot.paramMap.get('query');//snapshot only runs once when component loads
   
  this.activeRoute.paramMap.subscribe((params) => {//paramMap.subscribe() listens for every route change
    let query = params.get('query');
    console.log('Query:', query);

    if (query) {
          this.searchResult = [];//Clear old results before new search
      this.productService.searchProduct(query).subscribe((result) => {
        this.searchResult = result || [];
        console.log('Results:', this.searchResult);
          this.cd.detectChanges(); // 🔥 force UI update
      });
    }

  });
}}
