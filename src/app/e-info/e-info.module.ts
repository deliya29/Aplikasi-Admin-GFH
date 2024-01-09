import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EInfoPageRoutingModule } from './e-info-routing.module';

import { EInfoPage } from './e-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EInfoPageRoutingModule
  ],
  declarations: [EInfoPage]
})
export class EInfoPageModule {}
