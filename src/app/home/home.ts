import { Component, OnInit } from '@angular/core';
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

  constructor(private product: ProductService) { }
  ngOnInit(): void {
    this.product.popularProducts().subscribe((data) => {
      console.log(data);
      this.popularProducts = data;
    })
  }
}

