import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SellerAuth } from './seller-auth/seller-auth';
import { SellerHome } from './seller-home/seller-home';
import { AuthGuard } from './auth-guard';
import { SellerAddProduct } from './seller-add-product/seller-add-product';
import { SellerUpdateProduct } from './seller-update-product/seller-update-product'
import { Search } from './search/search';


export const routes: Routes = [
  //  home page routing
  {
    path: 'home',
    component: Home
  },
  //seller authenication page routing 
  {
    path: 'seller-auth',
    component: SellerAuth
  },
  //seller home page routing
  {
    path: 'seller-home',
    component: SellerHome,
    canActivate: [AuthGuard]//seller-home component is protected by the authGuard, which means that only authenticated users will be able to access it. You can implement your authentication logic in the authGuard to determine whether the user is authenticated or not.
  },
  //seller product adding page route
  {
    path: 'seller-add-product',
    component: SellerAddProduct,
    canActivate: [AuthGuard]//add product is protected by the authGuard, which willnot allow unauthoriseduser
  },

  //seller product updating page route
  {
    path: 'seller-update-product/:id',//passing the id along with update product URl
    component: SellerUpdateProduct, canActivate: [AuthGuard] //update theproduct with authorised  user
  },

  // product search page route
 {
  path: 'search/:query',
  component: Search
},

  {
    path: '', redirectTo:
      'home',
    pathMatch: 'full'
  },
{
  path: '**',
  redirectTo: 'home'
},
];