import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateChildProfilePage } from './create-child-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CreateChildProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateChildProfilePageRoutingModule {}
