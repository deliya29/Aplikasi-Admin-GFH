import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TUangPageRoutingModule } from './t-uang-routing.module';

import { TUangPage } from './t-uang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TUangPageRoutingModule
  ],
  declarations: [TUangPage]
})
export class TUangPageModule {}
