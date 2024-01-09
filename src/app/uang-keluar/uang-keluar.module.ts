import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UangKeluarPageRoutingModule } from './uang-keluar-routing.module';

import { UangKeluarPage } from './uang-keluar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UangKeluarPageRoutingModule
  ],
  declarations: [UangKeluarPage]
})
export class UangKeluarPageModule {}
