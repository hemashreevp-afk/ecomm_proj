import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, GuardResult, MaybeAsync } from '@angular/router';
import { Observable } from 'rxjs';
import { Seller } from './services/seller';


@Injectable({
  providedIn: 'root',
})  



export class AuthGuard implements CanActivate {
  constructor( private sellerService: Seller) { 
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.sellerService.isSellerLoggedIn;
  }
}