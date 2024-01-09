// penduduk.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PendudukPageRoutingModule } from './penduduk-routing.module';
import { PendudukPage } from './penduduk.page';
import { Storage } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PendudukPageRoutingModule
  ],
  declarations: [PendudukPage],
  providers: [Storage] // Pastikan Storage ditambahkan ke providers
})
export class PendudukPageModule {}
