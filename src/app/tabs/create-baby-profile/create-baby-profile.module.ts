import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBabyProfilePageRoutingModule } from './create-baby-profile-routing.module';

import { CreateBabyProfilePage } from './create-baby-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateBabyProfilePageRoutingModule
  ],
  declarations: [CreateBabyProfilePage]
})
export class CreateBabyProfilePageModule {}
