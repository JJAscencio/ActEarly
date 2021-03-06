import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
          }
        ]
      },
      {
        path: 'sign-up',
        children: [
          {
            path: '',
            loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
          }
        ]
      },
      {
        path: 'forgot',
        children: [
          {
            path:'',
            loadChildren: () => import('./forgot/forgot.module').then(m => m.ForgotPageModule)
          }
        ]

      },
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule { }
