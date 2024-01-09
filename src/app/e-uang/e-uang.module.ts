import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EUangPageRoutingModule } from './e-uang-routing.module';

import { EUangPage } from './e-uang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EUangPageRoutingModule
  ],
  declarations: [EUangPage]
})
export class EUangPageModule {}
