import { Routes } from '@angular/router';
import { authguardGuard } from './shared/guards/authguard.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then((x) => x.LoginComponent),
      }, {  
        path: '',
        canActivate: [authguardGuard],
        loadChildren: () => import('./main/main.routes').then((c) => c.routes)
      }
];
