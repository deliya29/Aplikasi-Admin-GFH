import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TUserPageRoutingModule } from './t-user-routing.module';

import { TUserPage } from './t-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TUserPageRoutingModule
  ],
  declarations: [TUserPage]
})
export class TUserPageModule {}
