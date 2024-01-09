import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EUserPageRoutingModule } from './e-user-routing.module';

import { EUserPage } from './e-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EUserPageRoutingModule
  ],
  declarations: [EUserPage]
})
export class EUserPageModule {}
