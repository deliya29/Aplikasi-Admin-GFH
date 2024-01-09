import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TPesanPageRoutingModule } from './t-pesan-routing.module';

import { TPesanPage } from './t-pesan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TPesanPageRoutingModule
  ],
  declarations: [TPesanPage]
})
export class TPesanPageModule {}
