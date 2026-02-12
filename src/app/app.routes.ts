import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SellerAuth } from './seller-auth/seller-auth';
import { SellerHome } from './seller-home/seller-home'; 



export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'seller-auth', component: SellerAuth },
  {path: 'seller-home', component: SellerHome},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];