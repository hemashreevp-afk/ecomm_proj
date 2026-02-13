import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return false; // to access the seller-home component, the user must be authenticated. Currently, it returns false, which means the user will not be able to access the seller-home component. You can implement your authentication logic here to return true if the user is authenticated and false otherwise.
};
