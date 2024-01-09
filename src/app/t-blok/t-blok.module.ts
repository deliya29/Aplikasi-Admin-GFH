import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TBlokPageRoutingModule } from './t-blok-routing.module';

import { TBlokPage } from './t-blok.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TBlokPageRoutingModule
  ],
  declarations: [TBlokPage]
})
export class TBlokPageModule {}
