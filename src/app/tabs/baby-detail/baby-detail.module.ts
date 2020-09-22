import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BabyDetailPageRoutingModule } from './baby-detail-routing.module';

import { BabyDetailPage } from './baby-detail.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BabyDetailPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [BabyDetailPage]
})
export class BabyDetailPageModule { }
