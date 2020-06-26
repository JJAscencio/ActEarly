import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBabyProfilePage } from './create-baby-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CreateBabyProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateBabyProfilePageRoutingModule {}
