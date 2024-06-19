import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const authguardGuard: CanActivateFn = (route, state) => {
  const authService: LoginService = inject(LoginService)
  const router:Router = inject(Router)
  
  /**
   * if the service have the localStorage token then it will redirect to the employeeList otherwise it will back to the loginPage
   */
  if (authService.getLocalStorgae()) {
    return true 
  }
  else {
    return router.createUrlTree(['/auth/login'])
  }
};
