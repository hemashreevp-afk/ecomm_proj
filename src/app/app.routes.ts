import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SellerAuth } from './seller-auth/seller-auth';
import { SellerHome } from './seller-home/seller-home'; 
import { AuthGuard } from './auth-guard';
import { SellerAddProduct } from './seller-add-product/seller-add-product';



export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'seller-auth', component: SellerAuth },
  {path: 'seller-home', component: SellerHome,canActivate: [AuthGuard]},//seller-home component is protected by the authGuard, which means that only authenticated users will be able to access it. You can implement your authentication logic in the authGuard to determine whether the user is authenticated or not.
  { path: 'seller-add-product',component:SellerAddProduct,canActivate: [AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
];