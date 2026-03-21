import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../data-type';
import { SellerHome } from '../seller-home/seller-home';  

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  constructor(private http:HttpClient) { } 

// aapi called for adding  product
  addProduct(data: Product) {
    console.warn('Product data submitted:', data);
    return this.http.post(`http://localhost:3000/products`, data);
  }

// api called  for get product list
  productList(){
    return this.http.get<Product[]>(`http://localhost:3000/products`);
  } 

  //api called   for  delete the product using product id
  deleteProduct(id: number)
  {
    return this.http.delete(`http://localhost:3000/products/${id}`);// add api  for delete product
  }

  //api called for get the product details using product id for updating the product details
  getProduct(id:string){
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: Product) {
    return this.http.put(`http://localhost:3000/products/${product.id}`, product);
  }

  popularProducts() {
    return this.http.get<Product[]>("http://localhost:3000/products?_limit=3");
  }
  //logic  need to change after database connected
  trendyProducts()
  {
    return this.http.get<Product[]>("http://localhost:3000/products?_limit=8");
  }

  //auto suggestion based on keyword enterin input text box
  searchProduct(query: string) {
  return this.http.get<Product[]>(`http://localhost:3000/products?q=${query}`);
}
}