import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Seller {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: object): Observable<any> {
    return this.http.post<any>('http://localhost:3000/seller', data);
  }

 reLoadSeller() {
    localStorage.removeItem('seller');
    this.isSellerLoggedIn.next(true);
    this.router.navigate(['/seller-auth']);
  }
 
}
