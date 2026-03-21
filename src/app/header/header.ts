import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { Route } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ProductService } from '../services/product';
import { Product } from '../data-type';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-header',
  imports: [RouterLink, TitleCasePipe, CommonModule],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  sellerName: string = " ";
  menuType: string = 'default';//used to determine which menu to display based on the user's login status and current route
  searchResult: Product[]|null = [];;// tostore the array product search

    constructor(
    private route: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url;
        console.log('Current URL:', currentUrl);
        if (currentUrl) {
          if (localStorage.getItem('seller') && currentUrl.startsWith('/seller')) {
            console.log('This seller route and seller is logged in');
            let sellerStore = localStorage.getItem('seller');   // store the seller details
            let sellerData = sellerStore && JSON.parse(sellerStore);
            this.sellerName = sellerData.name;//storing the seller name in a variable to display it in the header
            this.menuType = 'seller';
          } else {
            console.log('outside seller route or seller not logged in');
            this.menuType = 'default';
          }
        }
      }
    });

  }

  //logout function
  logout(): void {
    localStorage.removeItem('seller');
    this.sellerName = "";
    this.route.navigate(['/'])
  }
//function of search product
  searchProduct(query: KeyboardEvent) {
    if (query) {//check for key pressed or not 
      const element = query.target as HTMLInputElement;
      console.log(element.value);//value pressed from keyboard
      this.productService.searchProduct(element.value)
        .subscribe((result) => {
           this.searchResult = result.slice(0, 5); // ✅ limit to 5 items // detect the change in service and update view
          console.log(this.searchResult)
          this.cdr.detectChanges();
           
        });

    }
  }
}
