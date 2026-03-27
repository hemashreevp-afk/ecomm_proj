import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import { ProductService } from '../services/product';
import { Product } from '../data-type';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
popularProducts:any[]=[];//used to store the list of popular products fetched from the API
trendyProducts:any[]=[];//to show the trendy product list on home page
  constructor(
    private product: ProductService,
  private cd: ChangeDetectorRef) { }
  ngOnInit(): void {

    //product for display  home cauorsel
    this.product.popularProducts().subscribe((data) => {
      console.log(data);
      this.popularProducts = data;
       this.cd.detectChanges(); 
    })

    //product for display on trendy side
    this.product.trendyProducts().subscribe((data) => {
      console.log(data);
      this.trendyProducts = data;
       this.cd.detectChanges(); 
    })

  }
}

