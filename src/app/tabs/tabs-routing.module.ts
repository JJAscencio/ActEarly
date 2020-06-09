import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'kids',
        children: [
          {
            path: '',
            loadChildren: () => import('./kids/kids.module').then(m => m.KidsPageModule)
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
        redirectTo: '/tabs/kids',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/kids',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
