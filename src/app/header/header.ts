import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { Route } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [RouterLink, TitleCasePipe],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
    sellerName:string=" ";

 menuType: string = 'default';//used to determine which menu to display based on the user's login status and current route

  constructor(private route: Router) { }

  ngOnInit(): void {
  
this.route.events.subscribe((event) => {
  if (event instanceof NavigationEnd) {
    const currentUrl = event.url;
    console.log('Current URL:', currentUrl);
    if (currentUrl) {
      if (localStorage.getItem('seller') && currentUrl.startsWith('/seller')) {
        console.log('This seller route and seller is logged in');
       let sellerStore=localStorage.getItem('seller');
       let sellerData=sellerStore && JSON.parse(sellerStore);
       this.sellerName = sellerData[0].name;
      this.menuType = 'seller';
      } else {
        console.log('outside seller route or seller not logged in');
        this.menuType = 'default';
      }
    }
  }
});

  }
logout():void{
localStorage.removeItem('seller');
this.sellerName="";
this.route.navigate(['/'])
}
}
