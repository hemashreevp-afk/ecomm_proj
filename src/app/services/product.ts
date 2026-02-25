import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Product {
  
  constructor(private http:HttpClient) { } 
  addProduct(data: Product) {
    console.warn('Product data submitted:', data);
    return this.http.post(`http://localhost:3000/products`, data);
  }
}
