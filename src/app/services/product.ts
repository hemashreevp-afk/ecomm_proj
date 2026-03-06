import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../data-type';
import { SellerHome } from '../seller-home/seller-home';  

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  constructor(private http:HttpClient) { } 
  addProduct(data: Product) {
    console.warn('Product data submitted:', data);
    return this.http.post(`http://localhost:3000/products`, data);// add api  for add product
  }
  productList(){
    return this.http.get<Product[]>(`http://localhost:3000/products`);// add api  for get product list
  } 
  deleteProduct(id: number)
  {
    return this.http.delete(`http://localhost:3000/products/${id}`);// add api  for delete product
  }
}
