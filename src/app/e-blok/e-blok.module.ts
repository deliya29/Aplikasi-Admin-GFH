import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EBlokPageRoutingModule } from './e-blok-routing.module';

import { EBlokPage } from './e-blok.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EBlokPageRoutingModule
  ],
  declarations: [EBlokPage]
})
export class EBlokPageModule {}
