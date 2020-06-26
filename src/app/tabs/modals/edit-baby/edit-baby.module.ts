import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBabyPageRoutingModule } from './edit-baby-routing.module';

import { EditBabyPage } from './edit-baby.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditBabyPageRoutingModule
  ],
  declarations: [EditBabyPage]
})
export class EditBabyPageModule {}
