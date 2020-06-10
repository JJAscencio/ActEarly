import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'create-child-profile',
        children: [
          {
            path: '',
            loadChildren: () => import('./create-child-profile/create-child-profile.module').then( m => m.CreateChildProfilePageModule)
          }
        ]
      },
      {
        path: 'followup',
        children: [
          {
            path: '',
            loadChildren: () => import('./followup/followup.module').then(m => m.FollowupPageModule)
          }
        ]
      },
      {
        path: 'appointments',
        children: [
          {
            path: '',
            loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsPageModule)
          }
        ]
      },
      {
        path: 'information',
        children: [
          {
            path: '',
            loadChildren: () => import('./information/information.module').then(m => m.InformationPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/followup',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/followup',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
