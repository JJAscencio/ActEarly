import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateChildProfilePageRoutingModule } from './create-child-profile-routing.module';

import { CreateChildProfilePage } from './create-child-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateChildProfilePageRoutingModule
  ],
  declarations: [CreateChildProfilePage]
})
export class CreateChildProfilePageModule {}
