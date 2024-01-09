import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TInfoPageRoutingModule } from './t-info-routing.module';

import { TInfoPage } from './t-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TInfoPageRoutingModule
  ],
  declarations: [TInfoPage]
})
export class TInfoPageModule {}
