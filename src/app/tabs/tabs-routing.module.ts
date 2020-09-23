import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'create-baby-profile',
        children: [
          {
            path: '',
            loadChildren: () => import('./create-baby-profile/create-baby-profile.module').then(m => m.CreateBabyProfilePageModule)
          }
        ]
      },
      {
        path: 'followup',
        children: [
          {
            path: '',
            loadChildren: () => import('./followup/followup.module').then(m => m.FollowupPageModule)
          },
          {
            path: 'baby/:babyId',
            loadChildren: () => import('./baby-detail/baby-detail.module').then(m => m.BabyDetailPageModule)
          }
        ]
      },
      {
        path: 'seguimiento',
        children: [
          {
            path: '',
            loadChildren: () => import('./seguimiento/seguimiento.module').then(m => m.SeguimientoPageModule)
          },
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
  {
    path: 'edit-baby',
    loadChildren: () => import('./modals/edit-baby/edit-baby.module').then(m => m.EditBabyPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
