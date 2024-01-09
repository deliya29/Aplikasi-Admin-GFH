import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EPesanPageRoutingModule } from './e-pesan-routing.module';

import { EPesanPage } from './e-pesan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EPesanPageRoutingModule
  ],
  declarations: [EPesanPage]
})
export class EPesanPageModule {}
